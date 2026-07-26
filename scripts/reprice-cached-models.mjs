import fs from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve("assets/data/mytokenland-pricing-derived.json");
const multiplier = 1.2;

function round(value, digits = 4) {
  return value == null ? null : Number(Number(value).toFixed(digits));
}

function reprice(model) {
  if (model.unit === "request") {
    return { ...model, arabaiPriceUsd: round(Number(model.sourcePriceUsd || 0) * multiplier) };
  }
  return {
    ...model,
    arabaiInputUsd: round(Number(model.sourceInputUsd || 0) * multiplier),
    arabaiOutputUsd: round(Number(model.sourceOutputUsd || 0) * multiplier),
    arabaiCacheReadUsd: model.sourceCacheReadUsd == null ? null : round(Number(model.sourceCacheReadUsd) * multiplier),
    arabaiCacheWriteUsd: model.sourceCacheWriteUsd == null ? null : round(Number(model.sourceCacheWriteUsd) * multiplier)
  };
}

const payload = JSON.parse(await fs.readFile(inputPath, "utf8"));
payload.source.priceMultiplier = multiplier;
payload.source.note = "ARABAI display prices are derived from a cached public reference snapshot and multiplied by 1.2.";
payload.source.repricedAt = new Date().toISOString();
payload.models = payload.models.map(reprice);
const byName = new Map(payload.models.map((model) => [model.model, model]));
payload.featured = payload.featured.map((model) => byName.get(model.model) || reprice(model));
await fs.writeFile(inputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Repriced ${payload.models.length} cached models at x${multiplier}; source snapshot remains ${payload.generatedAt}.`);
