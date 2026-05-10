const revealTargets = document.querySelectorAll(
  ".path-card, .directory-item, .updates-grid article, .tool-table, .cms-list li"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("visible"));
}

const articleRoot = document.querySelector("#article-root");

if (articleRoot && window.ARTICLES) {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id") || "what-is-ai";
  const article = window.ARTICLES[articleId];

  if (!article) {
    articleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">MyAI</a>
        <span>Article not found</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">Missing article</p>
        <h1>Article not found</h1>
        <p>This article is not available yet.</p>
      </header>
    `;
  } else {
    document.title = `${article.title} - MyAI`;

    document
      .querySelector(`[data-nav="${article.section}"]`)
      ?.setAttribute("aria-current", "page");

    const footerLink = document.querySelector("#article-footer-link");
    if (footerLink) {
      footerLink.href = article.backUrl;
      footerLink.textContent = `Back to ${article.sectionLabel}`;
    }

    const sections = article.sections
      .map(([heading, text]) => `<h2>${heading}</h2><p>${linkKeywords(text, article.section)}</p>`)
      .join("");

    const prompt = article.prompt
      ? `<blockquote>${linkKeywords(article.prompt, article.section)}</blockquote>${renderPromptGuide(article.promptGuide, article.section)}`
      : "";

    const workflow = article.workflow
      ? `<h2>Do it step by step</h2><ol class="workflow-list">${article.workflow
          .map((step) => `<li>${linkKeywords(step, article.section)}</li>`)
          .join("")}</ol>`
      : "";

    const caseStudy = article.caseStudy ? renderCaseStudy(article.caseStudy, article.section) : "";

    const externalRefs = renderExternalRefs(article.externalRefs);
    const toolLinks = renderToolLinks(article.externalRefs);

    updateRechargeIntent(articleId, article);
    const rechargeNudge = renderRechargeNudge(articleId, article);

    const next = article.next
      ? `<div class="next-step"><span>Next article</span><a href="article.html?id=${article.next[0]}">${article.next[1]}</a></div>`
      : "";

    articleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${article.backUrl}">${article.sectionLabel}</a>
        <span>${article.title}</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">${article.sectionLabel}</p>
        <h1>${article.title}</h1>
        <p>${linkKeywords(article.intro, article.section)}</p>
      </header>
      <section class="article-body">
        ${sections}
        ${caseStudy}
        ${workflow}
        <h2>Try this</h2>
        ${prompt}
        ${toolLinks}
        ${externalRefs}
        ${rechargeNudge}
        ${next}
      </section>
    `;
  }
}

function renderToolLinks(refs) {
  const groups = groupToolLinks(refs);
  if (!groups.official.length && !groups.pricing.length && !groups.tutorial.length) return "";

  const columns = [
    ["Official website", groups.official],
    ["Pricing page", groups.pricing],
    ["Beginner tutorial", groups.tutorial]
  ]
    .filter(([, items]) => items.length)
    .map(
      ([heading, items]) => `
        <div class="tool-link-column">
          <h3>${heading}</h3>
          ${items
            .slice(0, 3)
            .map(
              ([title, url, note]) => `
                <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
                <p>${escapeHtml(note)}</p>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");

  return `
    <section class="tool-links">
      <p class="eyebrow">Try this tool</p>
      <h2>Open the right place</h2>
      <div class="tool-link-grid">${columns}</div>
    </section>
  `;
}

function groupToolLinks(refs) {
  const groups = {
    official: [],
    pricing: [],
    tutorial: []
  };

  for (const ref of refs || []) {
    const [title, url] = ref;
    const badge = referenceBadge(title, url);
    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();

    if (badge === "Pricing" || lowerTitle.includes("pricing") || lowerUrl.includes("pricing") || lowerUrl.includes("subscriptions")) {
      groups.pricing.push(ref);
    } else if (
      lowerTitle.includes("tutorial") ||
      lowerTitle.includes("guide") ||
      lowerTitle.includes("academy") ||
      lowerTitle.includes("help") ||
      lowerUrl.includes("help.") ||
      lowerUrl.includes("support.") ||
      lowerUrl.includes("academy") ||
      badge === "Video"
    ) {
      groups.tutorial.push(ref);
    } else if (badge === "Official") {
      groups.official.push(ref);
    } else {
      groups.tutorial.push(ref);
    }
  }

  return groups;
}

function updateRechargeIntent(articleId, article) {
  const state = readRechargeState();
  state.views = Array.isArray(state.views) ? state.views : [];

  if (!state.views.includes(articleId)) {
    state.views.push(articleId);
  }

  state.score = calculateRechargeIntentScore(state.views, article);
  state.lastSeen = new Date().toISOString();
  state.returning = Boolean(state.firstSeen && state.firstSeen.slice(0, 10) !== state.lastSeen.slice(0, 10));
  state.firstSeen = state.firstSeen || state.lastSeen;

  writeRechargeState(state);
}

function renderRechargeNudge(articleId, article) {
  if (!shouldShowRechargeNudge(articleId, article)) return "";

  const state = readRechargeState();
  state.nudgeShown = true;
  writeRechargeState(state);

  return `
    <aside class="recharge-nudge" aria-label="MyAI Credits note">
      <p class="eyebrow">For frequent AI users</p>
      <h2>Want one wallet for multiple AI tools?</h2>
      <p>MyAI Credits is a planned wallet for people who use AI often and want a quieter way to reach common tools from one place.</p>
      <a href="credits.html">Learn how credits will work</a>
    </aside>
  `;
}

function shouldShowRechargeNudge(articleId, article) {
  const state = readRechargeState();

  if (!article || article.section === "beginner") return false;
  if (state.nudgeShown) return false;
  if (state.views.length < 3) return false;
  if (state.score < 5) return false;
  if (getRechargeBucket() >= 5) return false;

  const eligibleArticles = new Set([
    "make-slides",
    "create-images",
    "make-videos",
    "make-music",
    "subscription-pages",
    "price-comparison",
    "what-is-api",
    "official-api-platforms",
    "api-price-comparison",
    "ai-gateway",
    "gateway-platforms"
  ]);

  return eligibleArticles.has(articleId) || article.section === "expert";
}

function calculateRechargeIntentScore(views, article) {
  const highIntentIds = new Set([
    "make-slides",
    "create-images",
    "make-videos",
    "make-music",
    "subscription-pages",
    "price-comparison",
    "what-is-api",
    "official-api-platforms",
    "api-price-comparison",
    "ai-gateway",
    "gateway-platforms"
  ]);

  let score = 0;
  for (const id of views) {
    const viewed = window.ARTICLES?.[id];
    if (viewed?.section === "advanced") score += 1;
    if (viewed?.section === "expert") score += 2;
    if (highIntentIds.has(id)) score += 2;
  }

  if (views.length >= 3) score += 2;

  const state = readRechargeState();
  if (state.returning) score += 2;
  if (article?.section === "expert") score += 1;

  return score;
}

function getRechargeBucket() {
  const key = "myai_recharge_bucket";
  const existing = localStorage.getItem(key);
  if (existing !== null && !Number.isNaN(Number(existing))) return Number(existing);

  const bucket = Math.floor(Math.random() * 100);
  localStorage.setItem(key, String(bucket));
  return bucket;
}

function readRechargeState() {
  try {
    return JSON.parse(localStorage.getItem("myai_recharge_state") || "{}");
  } catch {
    return {};
  }
}

function writeRechargeState(state) {
  localStorage.setItem("myai_recharge_state", JSON.stringify(state));
}

function renderExternalRefs(refs) {
  if (!refs || !refs.length) return "";

  const items = refs
    .map(
      ([title, url, note]) => {
        const badge = referenceBadge(title, url);
        return `
        <li>
          <span class="ref-badge">${badge}</span>
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
          <p>${escapeHtml(note)}</p>
        </li>
      `;
      }
    )
    .join("");

  return `
    <section class="external-refs">
      <h2>Useful external references</h2>
      <ul>${items}</ul>
    </section>
  `;
}

function referenceBadge(title, url) {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("youtube.com")) return "Video";
  if (
    lowerUrl.includes("openai.com") ||
    lowerUrl.includes("help.openai.com") ||
    lowerUrl.includes("support.google.com") ||
    lowerUrl.includes("support.claude.com") ||
    lowerUrl.includes("help.gamma.app") ||
    lowerUrl.includes("help.runwayml.com") ||
    lowerUrl.includes("canva.com") ||
    lowerUrl.includes("capcut.com") ||
    lowerUrl.includes("adobe.com")
  ) {
    return "Official";
  }

  if (lowerTitle.includes("pricing")) return "Pricing";
  return "Reference";
}

function renderCaseStudy(caseStudy, section) {
  const steps = caseStudy.steps
    .map(
      (step, index) => `
        <div class="case-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${linkKeywords(step, section)}</p>
        </div>
      `
    )
    .join("");

  const screens = (caseStudy.screens || [])
    .map(
      (screen) =>
        screen.image
          ? `
            <figure class="real-screen">
              <img src="${screen.image}" alt="${escapeHtml(screen.title)}" />
              <figcaption>${screen.title}</figcaption>
            </figure>
          `
          : `
            <figure class="fake-screen">
              <figcaption>${screen.title}</figcaption>
              <pre>${escapeHtml(screen.text)}</pre>
            </figure>
          `
    )
    .join("");

  return `
    <section class="case-study">
      <p class="eyebrow">Real example</p>
      <h2>${caseStudy.title}</h2>
      <p>${linkKeywords(caseStudy.scenario, section)}</p>
      <div class="case-steps">${steps}</div>
      ${screens}
      ${renderOutput(caseStudy.output)}
      <h3>Final result</h3>
      <div class="final-result">${caseStudy.result}</div>
    </section>
  `;
}

function renderPromptGuide(promptGuide, section) {
  if (!promptGuide || !promptGuide.length) return "";

  const rows = promptGuide
    .map(
      ([part, meaning]) => `
        <tr>
          <th>${escapeHtml(part)}</th>
          <td>${linkKeywords(meaning, section)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="prompt-guide">
      <h3>How this prompt works</h3>
      <p>A prompt is just a clear order. These parts tell AI what job to do and what kind of result to give back.</p>
      <table>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderOutput(output) {
  if (!output) return "";

  if (output.type === "image") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <figure class="output-image">
          <img src="${output.src}" alt="${escapeHtml(output.alt || output.title)}" />
        </figure>
      </div>
    `;
  }

  if (output.type === "deck") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <figure class="output-deck">
          <img src="${output.src}" alt="${escapeHtml(output.alt || output.title)}" />
        </figure>
      </div>
    `;
  }

  if (output.type === "table") {
    const headers = (output.columns || [])
      .map((column) => `<th>${escapeHtml(column)}</th>`)
      .join("");
    const rows = (output.rows || [])
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
      .join("");
    const summary = (output.summary || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <div class="output-table-wrap">
          <table class="output-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${summary ? `<ul class="output-captions">${summary}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "beforeAfter") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <div class="before-after">
          <figure>
            <img src="${output.before}" alt="${escapeHtml(output.beforeLabel)}" />
            <figcaption>${escapeHtml(output.beforeLabel)}</figcaption>
          </figure>
          <figure>
            <img src="${output.after}" alt="${escapeHtml(output.afterLabel)}" />
            <figcaption>${escapeHtml(output.afterLabel)}</figcaption>
          </figure>
        </div>
      </div>
    `;
  }

  if (output.type === "video") {
    const captions = (output.captions || [])
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <video class="output-video" src="${output.src}" controls playsinline preload="metadata"></video>
        ${captions ? `<ul class="output-captions">${captions}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "storyboardVideo") {
    const captions = (output.captions || [])
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <figure class="output-image storyboard-output">
          <img src="${output.storyboard}" alt="${escapeHtml(output.title)}" />
        </figure>
        <video class="output-video" src="${output.video}" controls playsinline preload="metadata"></video>
        ${captions ? `<ul class="output-captions">${captions}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "audio") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <audio class="output-audio" src="${output.src}" controls preload="metadata"></audio>
        ${output.note ? `<p class="output-note">${escapeHtml(output.note)}</p>` : ""}
      </div>
    `;
  }

  return "";
}

function linkKeywords(text, section) {
  const escaped = escapeHtml(text);
  const targets = getKeywordTargets(section);
  const terms = Object.keys(targets).sort((a, b) => b.length - a.length);

  if (!terms.length) return escaped;

  const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");
  const linked = new Set();

  return escaped.replace(pattern, (match) => {
    const key = terms.find((term) => term.toLowerCase() === match.toLowerCase());
    const target = targets[key];
    if (!target || linked.has(key.toLowerCase())) return match;
    linked.add(key.toLowerCase());
    return `<a class="keyword-link" href="article.html?id=${target}">${match}</a>`;
  });
}

function getKeywordTargets(section) {
  const beginnerTargets = {
    ChatGPT: "chatgpt-advanced",
    Gemini: "gemini-advanced",
    Claude: "claude-advanced",
    DeepSeek: "deepseek-advanced",
    Kimi: "kimi-advanced",
    Doubao: "doubao-advanced",
    Gamma: "make-slides",
    "image-2": "image-tools-advanced",
    Seedance: "video-tools-advanced",
    SeeDance: "video-tools-advanced",
    "Nano Banana": "image-tools-advanced",
    "OpenAI Image": "image-tools-advanced",
    "Alibaba Wan": "video-tools-advanced",
    Lyria: "music-tools-advanced",
    "GPT Audio Mini": "music-tools-advanced",
    Cursor: "ai-apps-and-coding-tools",
    "Claude Code": "ai-apps-and-coding-tools",
    Codex: "ai-apps-and-coding-tools",
    Antigravity: "ai-apps-and-coding-tools",
    "Cherry Studio": "ai-apps-and-coding-tools",
    "CC Switch": "ai-apps-and-coding-tools",
    Hermes: "ai-apps-and-coding-tools",
    OpenClaw: "ai-apps-and-coding-tools",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  const advancedTargets = {
    ChatGPT: "chatgpt-expert",
    Gemini: "gemini-expert",
    Claude: "claude-expert",
    DeepSeek: "deepseek-expert",
    Kimi: "kimi-expert",
    Doubao: "doubao-expert",
    Gamma: "ai-automation",
    "image-2": "image-tools-expert",
    Seedance: "video-tools-expert",
    SeeDance: "video-tools-expert",
    "Nano Banana": "image-tools-expert",
    "OpenAI Image": "image-tools-expert",
    "Alibaba Wan": "video-tools-expert",
    Lyria: "music-tools-expert",
    "GPT Audio Mini": "music-tools-expert",
    Cursor: "ai-automation",
    "Claude Code": "ai-automation",
    Codex: "ai-automation",
    Antigravity: "ai-automation",
    "Cherry Studio": "ai-gateway",
    "CC Switch": "ai-automation",
    Hermes: "multi-model-management",
    OpenClaw: "ai-automation",
    API: "what-is-api",
    "AI gateway": "ai-gateway",
    gateway: "ai-gateway",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  const expertTargets = {
    "API key": "official-api-platforms",
    "AI gateway": "ai-gateway",
    gateway: "ai-gateway",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  if (section === "beginner") return beginnerTargets;
  if (section === "advanced") return advancedTargets;
  return expertTargets;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
