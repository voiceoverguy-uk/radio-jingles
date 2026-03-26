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

  <!-- Main headline -->
  <text x="600" y="278" font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="128" fill="#ffffff" text-anchor="middle" letter-spacing="-2">Radio Jingles</text>

  <!-- Sub-line 1 -->
  <text x="600" y="382" font-family="Arial, sans-serif" font-weight="400"
        font-size="62" fill="#c8deff" text-anchor="middle" letter-spacing="0">Commercials &amp; Jingles</text>

  <!-- Sub-line 2 -->
  <text x="600" y="462" font-family="Arial, sans-serif" font-weight="400"
        font-size="62" fill="#c8deff" text-anchor="middle" letter-spacing="0">Since 1996</text>

  <!-- Domain watermark -->
  <text x="600" y="578" font-family="Arial, sans-serif" font-weight="600"
        font-size="24" fill="rgba(255,255,255,0.40)" text-anchor="middle" letter-spacing="4">RADIOJINGLES.COM</text>
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
