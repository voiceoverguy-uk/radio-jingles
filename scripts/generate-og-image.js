const sharp = require('sharp');
const path = require('path');

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1628" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#0a1628" stop-opacity="0.80"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#overlay)"/>

  <!-- Accent rule -->
  <rect x="520" y="252" width="160" height="3" rx="2" fill="#2da9ff"/>

  <!-- Main headline -->
  <text x="600" y="312" font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="86" fill="#ffffff" text-anchor="middle" letter-spacing="-2">Radio Jingles</text>

  <!-- Sub-line 1 -->
  <text x="600" y="393" font-family="Arial, sans-serif" font-weight="400"
        font-size="38" fill="#c8deff" text-anchor="middle" letter-spacing="1">Commercials &amp; Jingles</text>

  <!-- Sub-line 2 -->
  <text x="600" y="444" font-family="Arial, sans-serif" font-weight="400"
        font-size="38" fill="#c8deff" text-anchor="middle" letter-spacing="1">Since 1996</text>

  <!-- Domain watermark -->
  <text x="600" y="570" font-family="Arial, sans-serif" font-weight="600"
        font-size="22" fill="rgba(255,255,255,0.45)" text-anchor="middle" letter-spacing="3">RADIOJINGLES.COM</text>
</svg>`;

async function generate() {
  const bg = await sharp('public/images/radio-jingles-waveform-bg.jpg')
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer();

  await sharp(bg)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile('public/images/og-image.png');

  console.log('OG image generated → public/images/og-image.png');
}

generate().catch(err => { console.error(err); process.exit(1); });
