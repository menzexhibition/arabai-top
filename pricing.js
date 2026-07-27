async function loadArabaiPricing() {
  const response = await fetch("assets/data/mytokenland-pricing-derived.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Pricing file request failed: ${response.status}`);
  return response.json();
}

function formatUsd(value) {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 3 : 2,
    maximumFractionDigits: value < 1 ? 4 : 2
  }).format(Number(value));
}

function pricingText(model, locale) {
  if (model.unit === "request") {
    return {
      source: locale === "ar" ? `السعر المرجعي: ${formatUsd(model.sourcePriceUsd)} لكل طلب` : `Reference: ${formatUsd(model.sourcePriceUsd)} per request`,
      arabai: locale === "ar" ? `سعر ARABAI: ${formatUsd(model.arabaiPriceUsd)} لكل طلب` : `ARABAI: ${formatUsd(model.arabaiPriceUsd)} per request`
    };
  }

  return {
    source:
      locale === "ar"
        ? `المرجع: إدخال ${formatUsd(model.sourceInputUsd)} | إخراج ${formatUsd(model.sourceOutputUsd)} لكل 1M token`
        : `Reference: input ${formatUsd(model.sourceInputUsd)} | output ${formatUsd(model.sourceOutputUsd)} per 1M tokens`,
    arabai:
      locale === "ar"
        ? `ARABAI: إدخال ${formatUsd(model.arabaiInputUsd)} | إخراج ${formatUsd(model.arabaiOutputUsd)} لكل 1M token`
        : `ARABAI: input ${formatUsd(model.arabaiInputUsd)} | output ${formatUsd(model.arabaiOutputUsd)} per 1M tokens`
  };
}

function summarizeUseCase(model, locale) {
  const name = String(model.model || "").toLowerCase();
  if (name.includes("image")) {
    return locale === "ar" ? "إنشاء الصور والتعديل البصري" : "image generation and visual work";
  }
  if (name.includes("codex")) {
    return locale === "ar" ? "البرمجة وبناء الأدوات" : "coding and tool-building";
  }
  if (name.includes("deepseek")) {
    return locale === "ar" ? "التحليل والتفكير الأعمق" : "reasoning and deeper analysis";
  }
  if (name.includes("claude")) {
    return locale === "ar" ? "الكتابة والملفات الطويلة" : "writing and long-file work";
  }
  if (name.includes("gpt")) {
    return locale === "ar" ? "المهام العامة والشرح" : "general tasks and guided work";
  }
  if (name.includes("qwen")) {
    return locale === "ar" ? "المهام اليومية السريعة" : "fast everyday tasks";
  }
  return locale === "ar" ? "مهام AI عامة" : "general AI tasks";
}

function modelCategory(model) {
  const name = String(model.model || "").toLowerCase();
  const endpoints = Array.isArray(model.endpoints) ? model.endpoints.join(" ").toLowerCase() : "";
  if (name.includes("image") || endpoints.includes("image")) return "image";
  if (name.includes("codex") || name.includes("code")) return "code";
  if (name.includes("deepseek") || name.includes("reason")) return "reasoning";
  return "text";
}

function modelSlug(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function displayVendor(vendor, locale) {
  if (vendor === "阿里巴巴") return "Alibaba Cloud";
  return vendor || (locale === "ar" ? "مزود" : "Vendor");
}

function compactPrice(model, locale, source = false) {
  if (model.unit === "request") {
    const value = source ? model.sourcePriceUsd : model.arabaiPriceUsd;
    return locale === "ar"
      ? `${formatUsd(value)} / طلب`
      : `${formatUsd(value)} / request`;
  }

  const input = source ? model.sourceInputUsd : model.arabaiInputUsd;
  const output = source ? model.sourceOutputUsd : model.arabaiOutputUsd;
  return locale === "ar"
    ? `دخول ${formatUsd(input)} | خروج ${formatUsd(output)} لكل 1M token`
    : `in ${formatUsd(input)} | out ${formatUsd(output)}`;
}

function renderPricingCards(container, payload, locale, mode = "featured", limit = 8) {
  const list = mode === "full" || mode === "marketplace" ? payload.models : payload.featured;
  const items = list.slice(0, limit);
  const updated = new Date(payload.generatedAt);
  const isStale = !Number.isFinite(updated.getTime()) || Date.now() - updated.getTime() > 72 * 60 * 60 * 1000;
  const multiplier = Number(payload.source?.priceMultiplier || 1.2);
  const sourceLabel =
    locale === "ar"
      ? `المصدر: الأسعار العامة المرجعية، وسعر ARABAI يساوي سعر المصدر × ${multiplier}. تاريخ لقطة الأسعار: ${updated.toISOString().slice(0, 10)}`
      : `Public reference prices. ARABAI price equals source price × ${multiplier}. Snapshot: ${updated.toISOString().slice(0, 10)}`;

  if (mode === "marketplace") {
    container.innerHTML = `
      <div class="pricing-meta">${sourceLabel}${isStale && locale === "ar" ? "<br><strong>تنبيه: مر أكثر من 72 ساعة على آخر تحديث للأسعار. تحقق من السعر قبل الاعتماد عليه.</strong>" : ""}</div>
      <div class="output-table-wrap marketplace-table-wrap">
        <table class="output-table marketplace-table">
          <thead>
            <tr>
              <th>${locale === "ar" ? "النموذج" : "Model"}</th>
              <th>${locale === "ar" ? "سعر المصدر المرجعي ووحدة الحساب" : "Reference source price"}</th>
              <th>${locale === "ar" ? "سعر ARABAI ووحدة الحساب" : "ARABAI price"}</th>
              <th>${locale === "ar" ? "مناسب لأي شيء؟" : "Best for"}</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (model) => `
                  <tr data-model-row data-category="${modelCategory(model)}" data-search="${String(`${model.model} ${model.vendor || ""}`).toLowerCase()}">
                    <td>
                      <a class="model-name-link" href="models/${modelSlug(model.model)}.html"><strong>${model.model}</strong></a>
                      <div class="marketplace-vendor">${displayVendor(model.vendor, locale)}</div>
                    </td>
                    <td>${compactPrice(model, locale, true)}</td>
                    <td><strong>${compactPrice(model, locale, false)}</strong></td>
                    <td>${summarizeUseCase(model, locale)}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="pricing-meta">${sourceLabel}${isStale && locale === "ar" ? "<br><strong>تنبيه: مر أكثر من 72 ساعة على آخر تحديث للأسعار. تحقق من السعر قبل الاعتماد عليه.</strong>" : ""}</div>
    <div class="pricing-card-grid">
      ${items
        .map((model) => {
          const text = pricingText(model, locale);
          return `
            <article class="pricing-card">
              <div class="pricing-card-head">
                <span class="topic-label">${displayVendor(model.vendor, locale)}</span>
                <h3>${model.model}</h3>
              </div>
              <p>${text.source}</p>
              <p class="pricing-card-strong">${text.arabai}</p>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

async function initArabaiPricingBlocks() {
  const blocks = Array.from(document.querySelectorAll("[data-arabai-pricing]"));
  if (!blocks.length) return;

  try {
    const payload = await loadArabaiPricing();
    blocks.forEach((block) => {
      const locale = block.dataset.locale || (document.documentElement.lang === "ar" ? "ar" : "en");
      const mode = block.dataset.arabaiPricing || "featured";
      const limit = Number(block.dataset.limit || (mode === "full" ? 20 : 8));
      renderPricingCards(block, payload, locale, mode, limit);
      if (mode === "marketplace") initMarketplaceFilters(block);
    });
  } catch (error) {
    blocks.forEach((block) => {
      const locale = block.dataset.locale || "en";
      block.innerHTML = `<p class="pricing-meta">${locale === "ar" ? "تعذر تحميل جدول الأسعار الآن." : "Unable to load pricing right now."}</p>`;
    });
    console.error(error);
  }
}


function initMarketplaceFilters(container) {
  const search = document.querySelector("[data-model-search]");
  const filters = Array.from(document.querySelectorAll("[data-model-filter]"));
  const emptyState = document.querySelector("[data-model-empty]");
  let activeFilter = "all";

  const applyFilters = () => {
    const query = String(search?.value || "").trim().toLowerCase();
    let visible = 0;
    container.querySelectorAll("[data-model-row]").forEach((row) => {
      const matchesCategory = activeFilter === "all" || row.dataset.category === activeFilter;
      const matchesSearch = !query || String(row.dataset.search || "").includes(query);
      row.hidden = !(matchesCategory && matchesSearch);
      if (!row.hidden) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible > 0;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.modelFilter || "all";
      filters.forEach((item) => item.classList.toggle("active", item === button));
      applyFilters();
    });
  });
  search?.addEventListener("input", applyFilters);
}

document.addEventListener("DOMContentLoaded", initArabaiPricingBlocks);
