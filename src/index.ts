/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { generateImage } from "./handlers/generate";

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const hexRegex = /^(?:[0-9a-fA-F]{3}){1,2}$/;
const defaultColor1 = "CC27DA";
const defaultColor2 = "54C4FC";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/random":
        return new Response("Hello, world!");
      default:
        let color1 = url.searchParams.get("color1") || "";
        let color2 = url.searchParams.get("color2") || "";

        if (!hexRegex.test(color1)) {
          color1 = defaultColor1;
        }
        if (!hexRegex.test(color2)) {
          color2 = defaultColor2;
        }

        return generateImage(color1, color2);
    }
  },
};
