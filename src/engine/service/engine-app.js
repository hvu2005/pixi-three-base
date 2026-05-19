
import { execSync } from "child_process";


execSync("node src/engine/service/hot-loader/auto-assets.js", { stdio: "inherit" });