/**
 * Esqueleto Viral — /api/wa-count
 *
 * Edge Function: sem cold start, ~100ms de resposta.
 * Scrapa a página pública do canal do WhatsApp e retorna { count: N }.
 *
 * Cache strategy (Vercel CDN):
 *   - Scraping OK  → cache 2h  (s-maxage=7200),  revalida em bg por 24h
 *   - Fallback     → cache 5min (s-maxage=300),   revalida em bg por 10min
 *   - Erro de rede → cache 2min (s-maxage=120)
 *
 * O CDN revalida automaticamente em background (stale-while-revalidate),
 * então o visitante nunca espera — recebe o valor cacheado enquanto
 * a revalidação acontece em paralelo. Efeito prático: ~12x por dia.
 */

export const config = { runtime: 'edge' };

const CHANNEL_URL = 'https://www.whatsapp.com/channel/0029VbBq7gzKmCPScpRpQc09';
const FALLBACK    = 225;

function parseCount(html) {
  const patterns = [
    // "• 226 followers" — título da aba ou meta tag
    /[•·]\s*([\d,\.]+)\s*followers/i,
    // "226 followers" genérico
    /([\d,\.]+)\s*followers/i,
    // versão em português
    /([\d,\.]+)\s*seguidores/i,
    // JSON estruturado: "subscriberCount":"226"
    /"subscriberCount"\s*:\s*"?(\d+)"?/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) {
      const n = parseInt(m[1].replace(/[,\.]/g, ''), 10);
      if (!isNaN(n) && n > 0) return n;
    }
  }
  return null;
}

function json(data, cacheControl) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type':                'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':               cacheControl,
    },
  });
}

export default async function handler() {
  try {
    const res = await fetch(CHANNEL_URL, {
      headers: {
        // UA móvel — a página pública renderiza melhor assim
        'User-Agent':      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    });

    const html  = await res.text();
    const count = parseCount(html);

    if (count !== null) {
      // Scraping OK — cacheia por 2h, revalida em background
      return json(
        { count, ok: true, ts: new Date().toISOString() },
        's-maxage=7200, stale-while-revalidate=86400'
      );
    }

    // Padrão não encontrado — usa fallback, cacheia por 5min e tenta de novo
    return json(
      { count: FALLBACK, ok: false, reason: 'pattern_not_found' },
      's-maxage=300, stale-while-revalidate=600'
    );

  } catch (err) {
    // Erro de rede — fallback, cacheia por 2min
    return json(
      { count: FALLBACK, ok: false, reason: String(err) },
      's-maxage=120, stale-while-revalidate=300'
    );
  }
}
