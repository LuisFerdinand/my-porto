// Serves the production build made with `NEXT_DIST_DIR=.next-verify npm run build` on port 3010,
// so it can be checked without touching a dev server on port 3000.
import { spawn } from "node:child_process";

const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", "3010"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_DIST_DIR: ".next-verify" },
});
child.on("exit", (code) => process.exit(code ?? 0));
