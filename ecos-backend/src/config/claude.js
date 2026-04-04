// FILE: src/config/claude.js
// MOCK version — no real API key needed
// When you're ready to use the real Anthropic API, replace this file
// with the real client: import Anthropic from "@anthropic-ai/sdk"

export const DEFAULT_MODEL  = "claude-sonnet-4-20250514";
export const DEFAULT_TOKENS = 4096;

// Mock client — logs calls instead of hitting the API
const claude = {
  messages: {
    create: async (params) => {
      console.log(
        `\x1b[35m[MOCK Claude]\x1b[0m model=${params.model} max_tokens=${params.max_tokens}`
      );
      // Agents handle their own mock data — this client is a no-op placeholder
      return {
        content: [{ type: "text", text: "{}" }],
        usage:   { input_tokens: 0, output_tokens: 0 },
      };
    },
  },
};

export default claude;