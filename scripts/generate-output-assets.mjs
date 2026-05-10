import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const outDir = new URL("../assets/outputs/", import.meta.url);
const outPath = fileURLToPath(outDir);
mkdirSync(outDir, { recursive: true });

function save(name, svg) {
  writeFileSync(new URL(name, outDir), svg.trim());
}

const poster = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="58%">
      <stop offset="0" stop-color="#8b6b38"/>
      <stop offset="0.42" stop-color="#2d231b"/>
      <stop offset="1" stop-color="#0f1110"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0" stop-color="#f6df95"/>
      <stop offset="0.45" stop-color="#c6953a"/>
      <stop offset="1" stop-color="#7a5521"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1">
      <stop offset="0" stop-color="#f7e4ac" stop-opacity="0.92"/>
      <stop offset="0.35" stop-color="#815a24" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#27180c" stop-opacity="0.98"/>
    </linearGradient>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="url(#glow)"/>
  <circle cx="895" cy="170" r="130" fill="#d5a84f" opacity="0.08"/>
  <circle cx="160" cy="890" r="190" fill="#d5a84f" opacity="0.08"/>
  <path d="M128 170 C300 92, 772 92, 952 170" fill="none" stroke="#d5a84f" stroke-width="2" opacity="0.45"/>
  <path d="M128 912 C300 990, 772 990, 952 912" fill="none" stroke="#d5a84f" stroke-width="2" opacity="0.45"/>
  <g filter="url(#shadow)">
    <rect x="436" y="298" width="208" height="382" rx="56" fill="url(#glass)" stroke="#f1d98a" stroke-width="5"/>
    <rect x="478" y="244" width="124" height="86" rx="18" fill="url(#gold)"/>
    <rect x="456" y="222" width="168" height="44" rx="20" fill="#21170e" stroke="#d9ad58" stroke-width="4"/>
    <rect x="482" y="438" width="116" height="132" rx="18" fill="#141615" stroke="#d5a84f" stroke-width="3"/>
    <text x="540" y="492" text-anchor="middle" fill="#f6df95" font-family="Georgia, serif" font-size="30" font-weight="700">OUD</text>
    <text x="540" y="532" text-anchor="middle" fill="#d5a84f" font-family="Arial, sans-serif" font-size="18" letter-spacing="4">ARABAI</text>
  </g>
  <text x="540" y="132" text-anchor="middle" fill="#f8e7b0" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6">WEEKEND OUD SALE</text>
  <text x="540" y="760" text-anchor="middle" fill="#f8e7b0" font-family="Georgia, serif" font-size="86" font-weight="700">Up to 30% OFF</text>
  <text x="540" y="820" text-anchor="middle" fill="#d5a84f" font-family="Arial, sans-serif" font-size="32" font-weight="700">Friday &amp; Saturday Only</text>
  <rect x="388" y="866" width="304" height="72" rx="36" fill="url(#gold)"/>
  <text x="540" y="913" text-anchor="middle" fill="#15130e" font-family="Arial, sans-serif" font-size="28" font-weight="800">SHOP NOW</text>
</svg>`;

const before = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
  <rect width="900" height="700" fill="#d7c2a2"/>
  <path d="M0 520 L900 455 L900 700 L0 700 Z" fill="#9f7a56"/>
  <rect x="42" y="76" width="168" height="98" rx="12" fill="#6f8aa6" opacity="0.65"/>
  <rect x="672" y="102" width="170" height="92" rx="14" fill="#b7a34a" opacity="0.72"/>
  <path d="M90 430 C170 392, 260 392, 338 430" stroke="#614327" stroke-width="28" fill="none" opacity="0.48"/>
  <g filter="drop-shadow(0 22px 24px rgba(0,0,0,.28))">
    <rect x="358" y="215" width="184" height="270" rx="38" fill="#231611"/>
    <rect x="392" y="174" width="116" height="74" rx="16" fill="#b88d44"/>
    <rect x="380" y="312" width="140" height="102" rx="14" fill="#f8efe0"/>
    <text x="450" y="356" text-anchor="middle" fill="#2c2116" font-family="Arial" font-size="29" font-weight="800">OUD</text>
    <text x="450" y="389" text-anchor="middle" fill="#8d6a2e" font-family="Arial" font-size="18">Perfume</text>
  </g>
  <text x="42" y="640" fill="#614327" font-family="Arial" font-size="26" font-weight="700">Before: messy table photo</text>
</svg>`;

const after = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
  <defs>
    <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#f7f6f1"/>
      <stop offset="1" stop-color="#e9e5da"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="45%" r="44%">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#e9e5da"/>
    </radialGradient>
  </defs>
  <rect width="900" height="700" fill="url(#bg)"/>
  <ellipse cx="450" cy="392" rx="238" ry="238" fill="url(#halo)"/>
  <ellipse cx="450" cy="545" rx="170" ry="28" fill="#000" opacity="0.13"/>
  <g filter="drop-shadow(0 24px 22px rgba(0,0,0,.22))">
    <rect x="358" y="196" width="184" height="302" rx="42" fill="#211610"/>
    <rect x="392" y="148" width="116" height="78" rx="16" fill="#c89d4a"/>
    <rect x="380" y="309" width="140" height="112" rx="14" fill="#fff8ea"/>
    <text x="450" y="354" text-anchor="middle" fill="#2c2116" font-family="Arial" font-size="31" font-weight="800">OUD</text>
    <text x="450" y="389" text-anchor="middle" fill="#8d6a2e" font-family="Arial" font-size="18">Perfume</text>
  </g>
  <text x="42" y="640" fill="#59605d" font-family="Arial" font-size="26" font-weight="700">After: clean shop product image</text>
</svg>`;

save("oud-weekend-sale-poster.svg", poster);
save("product-before.svg", before);
save("product-after.svg", after);

const gammaDeck = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="900" viewBox="0 0 1280 900">
  <rect width="1280" height="900" fill="#f3f1eb"/>
  <text x="72" y="82" fill="#17201d" font-family="Arial" font-size="38" font-weight="800">Gamma deck preview: Restaurant Social Media Proposal</text>
  <text x="72" y="124" fill="#66736d" font-family="Arial" font-size="22">Six finished slides with layout, headings, bullets, and visual direction.</text>
  <g transform="translate(72 172)">
    <rect width="340" height="190" rx="16" fill="#17201d"/>
    <text x="28" y="54" fill="#f8e7b0" font-family="Arial" font-size="24" font-weight="800">1. Grow Online</text>
    <text x="28" y="96" fill="#f7f6f1" font-family="Arial" font-size="18">Social content for local restaurants</text>
    <rect x="28" y="128" width="124" height="18" rx="9" fill="#d5a84f"/>
  </g>
  <g transform="translate(470 172)">
    <rect width="340" height="190" rx="16" fill="#fffefa" stroke="#ded7c8"/>
    <text x="26" y="50" fill="#17201d" font-family="Arial" font-size="23" font-weight="800">2. Why It Matters</text>
    <circle cx="62" cy="98" r="20" fill="#008c95" opacity=".18"/>
    <text x="98" y="104" fill="#59605d" font-family="Arial" font-size="17">Customers check online first</text>
    <circle cx="62" cy="140" r="20" fill="#d5a84f" opacity=".22"/>
    <text x="98" y="146" fill="#59605d" font-family="Arial" font-size="17">Better photos build trust</text>
  </g>
  <g transform="translate(868 172)">
    <rect width="340" height="190" rx="16" fill="#fffefa" stroke="#ded7c8"/>
    <text x="26" y="50" fill="#17201d" font-family="Arial" font-size="23" font-weight="800">3. Services</text>
    <rect x="26" y="78" width="128" height="74" rx="14" fill="#008c95" opacity=".16"/>
    <rect x="178" y="78" width="128" height="74" rx="14" fill="#d5a84f" opacity=".2"/>
    <text x="42" y="122" fill="#17201d" font-family="Arial" font-size="16">Posts</text>
    <text x="194" y="122" fill="#17201d" font-family="Arial" font-size="16">Reels</text>
  </g>
  <g transform="translate(72 430)">
    <rect width="340" height="190" rx="16" fill="#fffefa" stroke="#ded7c8"/>
    <text x="26" y="50" fill="#17201d" font-family="Arial" font-size="23" font-weight="800">4. Content Plan</text>
    <rect x="26" y="82" width="286" height="22" rx="11" fill="#d5a84f" opacity=".45"/>
    <rect x="26" y="120" width="230" height="22" rx="11" fill="#008c95" opacity=".25"/>
    <rect x="26" y="158" width="260" height="22" rx="11" fill="#17201d" opacity=".18"/>
  </g>
  <g transform="translate(470 430)">
    <rect width="340" height="190" rx="16" fill="#fffefa" stroke="#ded7c8"/>
    <text x="26" y="50" fill="#17201d" font-family="Arial" font-size="23" font-weight="800">5. Expected Results</text>
    <text x="36" y="112" fill="#008c95" font-family="Arial" font-size="44" font-weight="800">+ Local</text>
    <text x="36" y="150" fill="#59605d" font-family="Arial" font-size="18">visibility, trust, and repeat visits</text>
  </g>
  <g transform="translate(868 430)">
    <rect width="340" height="190" rx="16" fill="#17201d"/>
    <text x="26" y="54" fill="#f8e7b0" font-family="Arial" font-size="23" font-weight="800">6. Next Steps</text>
    <text x="26" y="100" fill="#f7f6f1" font-family="Arial" font-size="18">Choose package</text>
    <text x="26" y="132" fill="#f7f6f1" font-family="Arial" font-size="18">Approve first month</text>
    <text x="26" y="164" fill="#f7f6f1" font-family="Arial" font-size="18">Start content calendar</text>
  </g>
  <rect x="72" y="720" width="1136" height="96" rx="22" fill="#fffefa" stroke="#ded7c8"/>
  <text x="104" y="778" fill="#17201d" font-family="Arial" font-size="24" font-weight="800">What the user should see in Gamma:</text>
  <text x="455" y="778" fill="#59605d" font-family="Arial" font-size="23">a real deck they can edit, not only a paragraph of slide ideas.</text>
</svg>`;

save("gamma-restaurant-proposal-deck.svg", gammaDeck);

const sceneSvgs = [
  ["video-scene-1.svg", "#18120d", "Ramadan Gift Collection", "Luxury date gift box opening"],
  ["video-scene-2.svg", "#24312a", "Perfect for Family & Friends", "Dates, Arabic coffee, warm table light"],
  ["video-scene-3.svg", "#302114", "Elegant Ramadan Packaging", "Gold ribbon placed on the box"],
  ["video-scene-4.svg", "#111514", "Order Yours Today", "Final hero shot with lantern glow"]
];

for (const [name, bg, caption, sub] of sceneSvgs) {
  save(name, `
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <radialGradient id="v" cx="50%" cy="45%" r="65%">
        <stop offset="0" stop-color="#d5a84f" stop-opacity="0.36"/>
        <stop offset="1" stop-color="${bg}"/>
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#v)"/>
    <rect x="430" y="236" width="420" height="210" rx="34" fill="#2a1b13" stroke="#d5a84f" stroke-width="6"/>
    <rect x="476" y="202" width="328" height="74" rx="22" fill="#b88937"/>
    <circle cx="540" cy="344" r="34" fill="#6b3b1e"/>
    <circle cx="626" cy="348" r="34" fill="#6b3b1e"/>
    <circle cx="712" cy="344" r="34" fill="#6b3b1e"/>
    <path d="M210 136 L238 194 L302 204 L256 248 L267 312 L210 282 L153 312 L164 248 L118 204 L182 194 Z" fill="#d5a84f" opacity=".26"/>
    <path d="M1035 120 C980 164 980 252 1035 296 C1006 286 948 246 948 208 C948 170 1006 130 1035 120Z" fill="#d5a84f" opacity=".3"/>
    <text x="640" y="540" text-anchor="middle" fill="#f8e7b0" font-family="Arial" font-size="56" font-weight="800">${caption}</text>
    <text x="640" y="596" text-anchor="middle" fill="#f4deb0" font-family="Arial" font-size="28">${sub}</text>
  </svg>`);
}

const storyboardTitles = [
  ["1", "Closed Gift Box", "Warm table, lantern glow"],
  ["2", "Box Opens", "The story begins"],
  ["3", "Dates Close-Up", "Show product detail"],
  ["4", "Arabic Coffee", "Add local feeling"],
  ["5", "Gold Ribbon", "Show premium packaging"],
  ["6", "Gift Moment", "Show why people buy"],
  ["7", "Ramadan Gift Collection", "First caption frame"],
  ["8", "Perfect for Family & Friends", "Second caption frame"],
  ["9", "Order Yours Today", "Final action frame"]
];

const storyboardCells = storyboardTitles.map(([num, title, sub], index) => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = 50 + col * 330;
  const y = 70 + row * 510;
  const bg = ["#20150f", "#2c2117", "#17231e", "#2b241a", "#302014", "#1b2424", "#171717", "#252017", "#111514"][index];
  return `
    <g transform="translate(${x} ${y})">
      <rect width="290" height="470" rx="28" fill="${bg}" stroke="#d5a84f" stroke-width="4"/>
      <rect x="58" y="128" width="174" height="112" rx="18" fill="#4a2a18" stroke="#d5a84f" stroke-width="4"/>
      <rect x="88" y="96" width="114" height="48" rx="14" fill="#b88937"/>
      <circle cx="108" cy="192" r="18" fill="#8b4b24"/>
      <circle cx="146" cy="194" r="18" fill="#8b4b24"/>
      <circle cx="184" cy="192" r="18" fill="#8b4b24"/>
      <path d="M58 306 C118 276 172 276 232 306" fill="none" stroke="#d5a84f" stroke-width="6" opacity="0.55"/>
      <circle cx="232" cy="72" r="28" fill="#d5a84f" opacity="0.18"/>
      <text x="26" y="50" fill="#f8e7b0" font-family="Arial" font-size="30" font-weight="800">${num}</text>
      <text x="145" y="356" text-anchor="middle" fill="#f8e7b0" font-family="Arial" font-size="24" font-weight="800">${title}</text>
      <text x="145" y="394" text-anchor="middle" fill="#f4deb0" font-family="Arial" font-size="17">${sub}</text>
    </g>
  `;
}).join("");

save("ramadan-date-gift-9-grid.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1680" viewBox="0 0 1080 1680">
  <rect width="1080" height="1680" fill="#f3f1eb"/>
  <text x="50" y="42" fill="#17201d" font-family="Arial" font-size="26" font-weight="800">9-grid storyboard: Ramadan date gift video</text>
  ${storyboardCells}
</svg>`);

execFileSync("ffmpeg", [
  "-y",
  "-f", "lavfi", "-i", "color=c=0x18120d:s=1280x720:d=3.75:r=30",
  "-f", "lavfi", "-i", "color=c=0x24312a:s=1280x720:d=3.75:r=30",
  "-f", "lavfi", "-i", "color=c=0x302114:s=1280x720:d=3.75:r=30",
  "-f", "lavfi", "-i", "color=c=0x111514:s=1280x720:d=3.75:r=30",
  "-filter_complex",
  [
    "[0:v]drawbox=x='430+20*t':y=236:w=420:h=210:color=0xd5a84f@0.25:t=fill,drawbox=x='430+20*t':y=236:w=420:h=210:color=0xd5a84f:t=6,drawbox=x=520:y=312:w=240:h=56:color=0x6b3b1e:t=fill[v0]",
    "[1:v]drawbox=x=430:y=236:w=420:h=210:color=0xd5a84f@0.22:t=fill,drawbox=x=510:y=300:w=70:h=70:color=0x6b3b1e:t=fill,drawbox=x=610:y=300:w=70:h=70:color=0x6b3b1e:t=fill,drawbox=x=710:y=300:w=70:h=70:color=0x6b3b1e:t=fill,drawbox=x=540:y=454:w=200:h=10:color=0xd5a84f:t=fill[v1]",
    "[2:v]drawbox=x=430:y=236:w=420:h=210:color=0xd5a84f@0.25:t=fill,drawbox=x='500+12*t':y=330:w=280:h=28:color=0xd5a84f:t=fill,drawbox=x=626:y=250:w=28:h=180:color=0xd5a84f:t=fill[v2]",
    "[3:v]drawbox=x=410:y=218:w=460:h=240:color=0xd5a84f@0.18:t=fill,drawbox=x=430:y=236:w=420:h=210:color=0xd5a84f:t=6,drawbox=x=540:y=312:w=200:h=78:color=0x6b3b1e:t=fill,drawbox=x=510:y=500:w=260:h=42:color=0xd5a84f:t=fill[v3]",
    "[v0][v1][v2][v3]concat=n=4:v=1:a=0,format=yuv420p[v]"
  ].join(";"),
  "-map", "[v]",
  "-movflags", "+faststart",
  fileURLToPath(new URL("ramadan-date-gift-video.mp4", outDir))
], { stdio: "inherit" });

execFileSync("ffmpeg", [
  "-y",
  "-f", "lavfi",
  "-i", "sine=frequency=220:duration=20",
  "-f", "lavfi",
  "-i", "sine=frequency=330:duration=20",
  "-f", "lavfi",
  "-i", "sine=frequency=440:duration=20",
  "-filter_complex", "[0:a]volume=0.16[a0];[1:a]volume=0.10[a1];[2:a]volume=0.06[a2];[a0][a1][a2]amix=inputs=3,afade=t=in:st=0:d=2,afade=t=out:st=18:d=2",
  "-c:a", "mp3",
  fileURLToPath(new URL("luxury-perfume-background-music.mp3", outDir))
], { stdio: "inherit" });
