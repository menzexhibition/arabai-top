import fs from "node:fs/promises";
import path from "node:path";

const STATUS_URL = "https://api.mytokenland.com/api/status";
const PRICING_URL = "https://api.mytokenland.com/api/pricing";
const OUTPUT_PATH = path.resolve("assets/data/mytokenland-pricing-derived.json");
const PRICE_MULTIPLIER = 1.2;

function round(value, digits = 4) {
  return Number(Number(value).toFixed(digits));
}

function normalizeModel(record, vendorMap, baseUnitPriceUsd) {
  const rawVendor = vendorMap.get(record.vendor_id) || "";
  const vendor = rawVendor === "阿里巴巴" ? "Alibaba Cloud" : rawVendor;
  const base = {
    model: record.model_name,
    vendor,
    quotaType: record.quota_type === 1 ? "fixed" : "metered",
    endpoints: Array.isArray(record.supported_endpoint_types) ? record.supported_endpoint_types : [],
    groups: Array.isArray(record.enable_groups) ? record.enable_groups : [],
    sourceModelRatio: record.model_ratio ?? null,
    sourceCompletionRatio: record.completion_ratio ?? null,
    sourceCacheRatio: record.cache_ratio ?? null,
    sourceCreateCacheRatio: record.create_cache_ratio ?? null,
    sourceModelPrice: record.model_price ?? null
  };

  if (record.quota_type === 1) {
    const sourcePerRequestUsd = round(Number(record.model_price || 0) * baseUnitPriceUsd);
    return {
      ...base,
      unit: "request",
      sourcePriceUsd: sourcePerRequestUsd,
      arabaiPriceUsd: round(sourcePerRequestUsd * PRICE_MULTIPLIER)
    };
  }

  const inputPer1MUsd = round(Number(record.model_ratio || 0) * 2 * baseUnitPriceUsd);
  const outputPer1MUsd = round(inputPer1MUsd * Number(record.completion_ratio || 1));
  const cacheReadPer1MUsd = record.cache_ratio != null ? round(inputPer1MUsd * Number(record.cache_ratio)) : null;
  const cacheWritePer1MUsd = record.create_cache_ratio != null ? round(inputPer1MUsd * Number(record.create_cache_ratio)) : null;

  return {
    ...base,
    unit: "1M_tokens",
    sourceInputUsd: inputPer1MUsd,
    sourceOutputUsd: outputPer1MUsd,
    sourceCacheReadUsd: cacheReadPer1MUsd,
    sourceCacheWriteUsd: cacheWritePer1MUsd,
    arabaiInputUsd: round(inputPer1MUsd * PRICE_MULTIPLIER),
    arabaiOutputUsd: round(outputPer1MUsd * PRICE_MULTIPLIER),
    arabaiCacheReadUsd: cacheReadPer1MUsd == null ? null : round(cacheReadPer1MUsd * PRICE_MULTIPLIER),
    arabaiCacheWriteUsd: cacheWritePer1MUsd == null ? null : round(cacheWritePer1MUsd * PRICE_MULTIPLIER)
  };
}

async function main() {
  const headers = { "User-Agent": "Mozilla/5.0 ARABAI pricing updater" };
  const [statusResponse, pricingResponse] = await Promise.all([
    fetch(STATUS_URL, { headers }),
    fetch(PRICING_URL, { headers })
  ]);

  if (!statusResponse.ok) throw new Error(`Status request failed: ${statusResponse.status}`);
  if (!pricingResponse.ok) throw new Error(`Pricing request failed: ${pricingResponse.status}`);

  const statusJson = await statusResponse.json();
  const pricingJson = await pricingResponse.json();

  if (!statusJson?.success) throw new Error(`Status API error: ${statusJson?.message || "unknown"}`);
  if (!pricingJson?.success) throw new Error(`Pricing API error: ${pricingJson?.message || "unknown"}`);

  const status = statusJson.data || {};
  const vendors = Array.isArray(pricingJson.vendors) ? pricingJson.vendors : [];
  const vendorMap = new Map(vendors.map((item) => [item.id, item.name]));
  const baseUnitPriceUsd = Number(status.price || 0);
  const models = Array.isArray(pricingJson.data) ? pricingJson.data : [];

  const featuredOrder = [
    "claude-sonnet-4-6",
    "claude-opus-4-6",
    "gpt-5.4-mini",
    "gpt-5.4",
    "gpt-5.5",
    "gpt-5.3-codex",
    "deepseek-v4-flash",
    "deepseek-v4-pro",
    "qwen3.6-plus",
    "gpt-image-2"
  ];

  const normalized = models.map((record) => normalizeModel(record, vendorMap, baseUnitPriceUsd));
  const featured = featuredOrder
    .map((name) => normalized.find((item) => item.model === name))
    .filter(Boolean);

  const output = {
    generatedAt: new Date().toISOString(),
    source: {
      quotaDisplayType: status.quota_display_type || "USD",
      baseUnitPriceUsd,
      priceMultiplier: PRICE_MULTIPLIER,
      note: "ARABAI display prices are derived from a public reference snapshot and multiplied by 1.2."
    },
    featured,
    models: normalized
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.log(`Wrote ${normalized.length} models to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
