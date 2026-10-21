import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setVideoImageFormat("png");
Config.setStillImageFormat("png");

// Use local Chrome if installed to render instantly without network downloads
const localChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
if (fs.existsSync(localChrome)) {
  Config.setBrowserExecutable(localChrome);
}

