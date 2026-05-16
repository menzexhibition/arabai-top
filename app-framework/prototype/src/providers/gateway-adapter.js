export function createGatewayAdapter({
  baseUrl,
  apiKey,
  defaultTextModel = "gpt-4o-mini",
  defaultImageModel = "gpt-image-1",
  timeoutMs = 60000
}) {
  if (!baseUrl || !apiKey) {
    return createDisabledAdapter();
  }

  return {
    async runTextTask(input) {
      const startedAt = Date.now();
      const model = input.options?.model || defaultTextModel;
      const response = await fetch(withPath(baseUrl, "/v1/chat/completions"), {
        method: "POST",
        headers: {
          "authorization": `Bearer ${apiKey}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: buildMessages(input),
          temperature: input.options?.temperature ?? 0.4
        }),
        signal: AbortSignal.timeout(timeoutMs)
      });

      const data = await parseProviderResponse(response);
      const outputText = data.choices?.[0]?.message?.content || "";

      return {
        outputText,
        providerCost: readProviderCost(data),
        providerMeta: {
          model,
          usage: data.usage,
          latencyMs: Date.now() - startedAt
        }
      };
    },
    async runImageTask(input) {
      const startedAt = Date.now();
      const model = input.options?.model || defaultImageModel;
      const response = await fetch(withPath(baseUrl, "/v1/images/generations"), {
        method: "POST",
        headers: {
          "authorization": `Bearer ${apiKey}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model,
          prompt: input.prompt,
          n: input.options?.count || 1,
          size: input.options?.size || "1024x1024"
        }),
        signal: AbortSignal.timeout(timeoutMs)
      });

      const data = await parseProviderResponse(response);
      const firstImage = data.data?.[0];

      return {
        outputUrl: firstImage?.url,
        outputText: firstImage?.b64_json ? "Image returned as base64 data by provider." : undefined,
        providerCost: readProviderCost(data),
        providerMeta: {
          model,
          usage: data.usage,
          latencyMs: Date.now() - startedAt
        }
      };
    }
  };
}

export function createMockGatewayAdapter() {
  return {
    async runTextTask(input) {
      return {
        outputText: `Demo result for ${input.pricingRuleId}: ARABAI would call the paid AI provider here.`,
        actualCredits: undefined,
        providerCost: 0.01,
        providerMeta: { mock: true }
      };
    },
    async runImageTask(input) {
      return {
        outputText: `Demo image task accepted for ${input.pricingRuleId}.`,
        outputUrl: null,
        actualCredits: undefined,
        providerCost: 0.05,
        providerMeta: { mock: true }
      };
    }
  };
}

function createDisabledAdapter() {
  return {
    async runTextTask() {
      throw new Error("AI gateway is not configured.");
    },
    async runImageTask() {
      throw new Error("AI gateway is not configured.");
    }
  };
}

function buildMessages(input) {
  const systemPrompt =
    input.options?.system ||
    "You are ARABAI, a practical AI assistant for beginner users. Answer clearly, simply, and avoid technical language unless asked.";

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: input.prompt }
  ];
}

async function parseProviderResponse(response) {
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = data.error?.message || data.message || `Provider request failed with ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    error.providerResponse = data;
    throw error;
  }

  return data;
}

function readProviderCost(data) {
  return data.cost || data.provider_cost || data.usage?.cost || null;
}

function withPath(baseUrl, path) {
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}
