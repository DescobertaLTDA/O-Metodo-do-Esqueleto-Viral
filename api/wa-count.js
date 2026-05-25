/**
 * Vercel Serverless Function — /api/wa-count
 * Scrapes the public WhatsApp channel page and returns the follower count.
 * Cached for 1 hour on Vercel's edge.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const CHANNEL_URL = 'https://www.whatsapp.com/channel/0029VbBq7gzKmCPScpRpQc09';
  const FALLBACK    = 225;

  try {
    const r = await fetch(CHANNEL_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    });

    const html = await r.text();

    // Padrões possíveis na página pública do WhatsApp
    const patterns = [
      /(\d[\d\.,]+)\s*followers?/i,
      /(\d[\d\.,]+)\s*seguidores?/i,
      /"subscriberCount"\s*:\s*"?(\d+)"?/i,
      /channel.*?(\d[\d\.,]+)\s*(?:followers|seguidores)/i,
    ];

    for (const p of patterns) {
      const m = html.match(p);
      if (m) {
        const count = parseInt(m[1].replace(/[,\.]/g, ''), 10);
        if (count > 0) {
          return res.json({ count, ok: true });
        }
      }
    }

    // Fallback se não encontrou
    res.json({ count: FALLBACK, ok: false, reason: 'pattern_not_found' });
  } catch (e) {
    res.json({ count: FALLBACK, ok: false, reason: e.message });
  }
}
