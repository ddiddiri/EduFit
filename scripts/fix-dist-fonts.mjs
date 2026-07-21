// Cloudflare Pages는 경로에 node_modules가 포함된 파일을 업로드에서 제외한다.
// expo export가 만든 dist의 아이콘 폰트가 assets/node_modules/... 에 있어
// 배포 시 404(SPA 폴백 HTML)가 되므로 assets/vendor로 옮기고 참조를 치환한다.
// 사용: expo export 후 `node scripts/fix-dist-fonts.mjs` → wrangler pages deploy
import { renameSync, readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const OLD = "assets/node_modules";
const NEW = "assets/vendor";

if (existsSync(join("dist", OLD))) {
  renameSync(join("dist", OLD), join("dist", NEW));
  console.log("renamed:", OLD, "->", NEW);
}

const patch = (p) => {
  const src = readFileSync(p, "utf8");
  if (src.includes(OLD)) {
    writeFileSync(p, src.split(OLD).join(NEW));
    console.log("patched:", p);
  }
};

const jsDir = join("dist", "_expo", "static", "js", "web");
if (existsSync(jsDir)) readdirSync(jsDir).forEach((f) => patch(join(jsDir, f)));
readdirSync("dist").filter((f) => f.endsWith(".html")).forEach((f) => patch(join("dist", f)));
console.log("DONE");
