import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "server"), { recursive: true });

for (const entry of ["index.html", "interactive-nn.html", "assets", "playbook"]) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.includes(".") && !url.pathname.endsWith("/")) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(new Request(url, request));
  }
};
`;

await writeFile(join(dist, "server", "index.js"), worker, "utf8");
console.log("Built static portfolio for Sites.");
