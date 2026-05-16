export function createGatewayAdapter({ baseUrl, apiKey }) {
  if (!baseUrl || !apiKey) {
    return createDisabledAdapter();
  }

  return {
    async runTextTask(input) {
      // Real implementation should call the private backend gateway here.
      // Never send apiKey to the browser.
      return {
        outputText: `Provider call placeholder for ${input.pricingRuleId}.`,
        providerCost: null,
        providerMeta: {
          baseUrl,
          model: input.options?.model || "configured-default"
        }
      };
    },
    async runImageTask(input) {
      return {
        outputUrl: null,
        providerCost: null,
        providerMeta: {
          baseUrl,
          model: input.options?.model || "configured-image-default"
        }
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

