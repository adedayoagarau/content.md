import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createContentDesignReviewSubmissionTemplate } from "@contentmd/agent";
import { canonicalJson } from "@contentmd/core";
import { BENCHMARK_REVIEW_CLIENT } from "./benchmark-review-client.js";

const CSP = "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'";

export interface ContentDesignReviewWorkbenchOptions { packet: string; host?: string; port?: number }
export interface ContentDesignReviewWorkbench { url: string; close(): Promise<void> }

function headers(type: string): Record<string, string> { return { "Content-Type": type, "Content-Security-Policy": CSP, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" }; }

function html(): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Content-design calibration · content.md</title><style>
  :root{--ink:#19231f;--muted:#66716c;--paper:#ede8dc;--card:#fffdf7;--line:#cec7b7;--green:#185c45;--amber:#9b5d13}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 "Avenir Next",Avenir,"Segoe UI",sans-serif}header,main{max-width:1180px;margin:auto}header{padding:32px 24px 20px;border-bottom:1px solid var(--line)}h1,h2{font-family:"Iowan Old Style",Palatino,serif}h1{font-size:clamp(32px,5vw,56px);line-height:1;margin:6px 0}.eyebrow{color:var(--green);text-transform:uppercase;letter-spacing:.13em;font-size:11px}main{padding:20px 24px 60px}.meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}.panel,.meaning-rail,.review{background:var(--card);border:1px solid var(--line);padding:20px}.workspace{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.5fr);gap:12px}.meaning-rail{border-top:5px solid var(--green);position:sticky;top:12px;align-self:start}.meaning-rail dl{display:grid;gap:12px}.meaning-rail dt{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}.meaning-rail dd{margin:2px 0 0}.candidate{font:500 22px/1.35 "Iowan Old Style",Palatino,serif;padding:18px;border-left:4px solid var(--green);background:#f5f1e7}.support,.status{color:var(--muted)}#review-fields{display:grid;gap:16px}label{display:grid;gap:6px;font-weight:600;font-size:12px;color:var(--muted)}select,textarea,input{width:100%;padding:10px;border:1px solid var(--line);background:#fff;color:var(--ink);font:inherit}textarea{resize:vertical}fieldset{border:1px solid var(--line);display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:14px}legend{font-weight:700}.actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;margin-top:16px}button{border:0;background:var(--ink);color:white;padding:11px 16px;font-weight:700;cursor:pointer}button:disabled{opacity:.4;cursor:not-allowed}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid var(--amber);outline-offset:2px}.reviewer{display:grid;grid-template-columns:1fr 1fr;gap:12px}.check{display:flex;gap:8px;align-items:center}.check input{width:auto}@media(max-width:800px){.workspace,.meta,.reviewer{grid-template-columns:1fr}.meaning-rail{position:static}fieldset{grid-template-columns:1fr}}
  </style></head><body><header><p class="eyebrow">Independent calibration · hidden labels remain hidden</p><h1>Judge the meaning, not the generator</h1><p id="completion" aria-live="polite">Loading review packet…</p></header><main><section class="meta panel"><label>Reviewer ID<input id="reviewer-id" autocomplete="off"></label><label>Reviewed at · RFC 3339<input id="reviewed-at" type="text" placeholder="2026-09-14T15:00:00Z" autocomplete="off"></label><label class="check"><input id="attest" type="checkbox"> I completed this review independently</label></section><div class="workspace"><aside class="meaning-rail"><p class="eyebrow"><span id="progress"></span> · <span id="ability"></span></p><h2 id="objective"></h2><dl><div><dt>User goal</dt><dd id="goal"></dd></div><div><dt>State</dt><dd id="state"></dd></div><div><dt>Action</dt><dd id="action"></dd></div><div><dt>Consequence</dt><dd id="consequence"></dd></div><div><dt>Risk</dt><dd id="risk"></dd></div><div><dt>Evidence</dt><dd id="evidence"></dd></div><div><dt>Surface</dt><dd id="surface"></dd></div><div><dt>Locale</dt><dd id="locale"></dd></div></dl></aside><section class="review"><p class="eyebrow" id="voice-tone"></p><h2>Candidate in context</h2><p class="candidate" id="candidate"></p><p class="support"><strong>Supporting text:</strong> <span id="supporting"></span></p><div id="review-fields"></div><p class="status" id="item-status" aria-live="polite"></p><div class="actions"><button id="previous" type="button">Previous</button><button id="next" type="button">Next</button><button id="next-incomplete" type="button">Next incomplete</button><button id="export" type="button" disabled>Export completed review</button></div></section></div></main><script src="/review.js"></script></body></html>`;
}

export async function startContentDesignReviewWorkbench(options: ContentDesignReviewWorkbenchOptions): Promise<ContentDesignReviewWorkbench> {
  const host = options.host ?? "127.0.0.1";
  const port = options.port ?? 4179;
  if (host !== "127.0.0.1" && host !== "::1") throw new Error("benchmark_review_host_not_local");
  const packet = JSON.parse(await readFile(options.packet, "utf8")) as unknown;
  const template = createContentDesignReviewSubmissionTemplate(packet);
  const data = canonicalJson({ packet, template });
  const server = createServer((request, response) => {
    const method = request.method ?? "GET";
    const route = new URL(request.url ?? "/", "http://localhost").pathname;
    if (method !== "GET" && method !== "HEAD") { response.writeHead(405, headers("text/plain; charset=utf-8")); response.end("Method not allowed"); return; }
    const body = route === "/" ? html() : route === "/review.js" ? BENCHMARK_REVIEW_CLIENT : route === "/review-data.json" ? data : "Not found";
    const status = route === "/" || route === "/review.js" || route === "/review-data.json" ? 200 : 404;
    const type = route === "/" ? "text/html; charset=utf-8" : route === "/review.js" ? "text/javascript; charset=utf-8" : route === "/review-data.json" ? "application/json; charset=utf-8" : "text/plain; charset=utf-8";
    response.writeHead(status, headers(type)); response.end(method === "HEAD" ? undefined : body);
  });
  await new Promise<void>((resolve, reject) => { server.once("error", reject); server.listen(port, host, () => { server.off("error", reject); resolve(); }); });
  const address = server.address();
  if (address === null || typeof address === "string") throw new Error("benchmark_review_listen_failed");
  const shownHost = host === "::1" ? "[::1]" : host;
  return { url: `http://${shownHost}:${address.port}/`, close: () => new Promise<void>((resolve, reject) => server.close((error) => error === undefined ? resolve() : reject(error))) };
}
