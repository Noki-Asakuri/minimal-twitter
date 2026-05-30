import { exec } from "child_process";
import { copy } from "fs-extra";
import { copyFile, rm, writeFile } from "fs/promises";
import process from "process";
import readline from "readline";
import zipper from "zip-local";

const runCommand = (command, yes) =>
  new Promise((resolve, reject) => {
    exec(yes ? `echo "y" | ${command}` : command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });

const canRenderSpinner =
  typeof process.stdout.clearLine === "function" &&
  typeof process.stdout.cursorTo === "function";

const clearSpinnerLine = () => {
  if (!canRenderSpinner) {
    return;
  }

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
};

const renderSpinner = (message) => {
  if (!canRenderSpinner) {
    return;
  }

  process.stdout.write(message);
};

let manifest = {
  name: "Minimal Theme for Twitter / X",
  short_name: "Minimal Twitter",
  description: "Refine and declutter the 𝕏/Twitter web experience.",
  version: "6.4.2",
  icons: {
    16: "images/MinimalTwitterIcon16.png",
    32: "images/MinimalTwitterIcon32.png",
    48: "images/MinimalTwitterIcon48.png",
    128: "images/MinimalTwitterIcon128.png",
  },
  permissions: ["storage"],
  options_ui: {
    page: "index.html",
    open_in_tab: true,
  },
};

const MANIFEST_CHROME = {
  ...manifest,
  manifest_version: 3,
  background: {
    service_worker: "background.js",
    type: "module",
  },
  content_scripts: [
    {
      run_at: "document_end",
      matches: [
        "https://twitter.com/*",
        "https://mobile.twitter.com/*",
        "https://x.com/*",
      ],
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "css/main.css",
        "css/typefully.css",
        "fonts/inter-subset.woff2",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/main.css",
        "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/typefully.css",
      ],
      matches: [
        "https://twitter.com/*",
        "https://mobile.twitter.com/*",
        "https://x.com/*",
      ],
    },
  ],
  action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

const MANIFEST_FIREFOX = {
  ...manifest,
  manifest_version: 2,
  browser_specific_settings: {
    gecko: {
      id: "{e7476172-097c-4b77-b56e-f56a894adca9}",
    },
  },
  background: {
    scripts: ["background.js"],
    persistent: false,
  },
  content_scripts: [
    {
      run_at: "document_idle",
      matches: [
        "https://twitter.com/*",
        "https://mobile.twitter.com/*",
        "https://x.com/*",
      ],
      js: ["dist/main.js"],
    },
  ],
  web_accessible_resources: [
    "css/main.css",
    "css/typefully.css",
    "fonts/inter-subset.woff2",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/main.css",
    "https://cdn.jsdelivr.net/gh/typefully/minimal-twitter@5.1/css/typefully.css",
  ],
  browser_action: {
    default_icon: {
      16: "images/MinimalTwitterIcon16.png",
      32: "images/MinimalTwitterIcon32.png",
      48: "images/MinimalTwitterIcon48.png",
    },
    default_title: "Minimal Twitter",
    default_popup: "index.html",
  },
};

const bundle = async (manifest, bundleDirectory) => {
  try {
    // Remove old bundle directory
    await rm(bundleDirectory, { recursive: true, force: true }); // requires node 14+
    console.log(`🧹  Cleaned up \`${bundleDirectory}\` directory.`);

    // Install workspace dependencies and run both build scripts
    await runCommand("bun install");

    const runBuildScript = (directory) => {
      return new Promise(async (resolve, reject) => {
        let intervalId;
        let spinner = "\\";
        const startBuilding = () => {
          if (!canRenderSpinner) {
            console.log("Building popup and content scripts...");
            return;
          }

          let P = ["\\", "|", "/", "-"];
          intervalId = setInterval(() => {
            clearSpinnerLine();
            spinner = P[P.indexOf(spinner) + 1] || P[0];
            renderSpinner(`${spinner}   Building popup and content scripts...`);
          }, 250);
        };

        startBuilding();

        try {
          await runCommand(`bun run --cwd ./${directory} build`);
          clearInterval(intervalId);
          resolve();
        } catch (error) {
          clearInterval(intervalId);
          console.error(
            `Error running build script for ${directory}: ${error}`
          );
          reject(error);
        }
      });
    };

    await runBuildScript("popup");
    await runBuildScript("content-scripts");

    clearSpinnerLine();
    console.log("🔥  Built popup and content scripts.");

    // Bundle popup Next.js export
    await copy("popup/out", `${bundleDirectory}`);
    console.log(`🚗  Moved export to bundle.`);

    // Bundle content-scripts
    await copy("content-scripts/dist", `${bundleDirectory}/dist`);
    console.log(`🚗  Moved content_scripts to bundle.`);

    // Bundle background.js
    await copyFile("background.js", `${bundleDirectory}/background.js`);
    console.log(`🚗  Moved background.js to bundle.`);

    // Bundle css
    await copy("css", `${bundleDirectory}/css`);
    console.log(`🚗  Moved css to bundle.`);

    // Bundle fonts
    await copy("fonts", `${bundleDirectory}/fonts`);
    console.log(`🚗  Moved fonts to bundle.`);

    // Bundle images
    await copy("images", `${bundleDirectory}/images`);
    console.log(`🚗  Moved images to bundle.`);

    // Create manifest
    await writeFile(
      `${bundleDirectory}/manifest.json`,
      Buffer.from(JSON.stringify(manifest, null, 2)),
      "utf8"
    );

    // Done.
    console.log(`📦  Bundled \`${bundleDirectory}\`.`);

    // Zip the directory
    zipper.sync
      .zip(`./${bundleDirectory}`)
      .compress()
      .save(`./bundle/${bundleDirectory.replace("bundle/", "")}.zip`);

    console.log(
      `🧬  Zipped \`${bundleDirectory}\` to \`bundle/${bundleDirectory.replace(
        "bundle/",
        ""
      )}.zip\`.`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const bundleAll = async () => {
  await bundle(MANIFEST_CHROME, "bundle/chrome");
  await bundle(MANIFEST_FIREFOX, "bundle/firefox");
};

const bundleBrowser = async (browser) => {
  switch (browser.toLowerCase()) {
    case "chrome":
      await bundle(MANIFEST_CHROME, "bundle/chrome");
      break;

    case "firefox":
      await bundle(MANIFEST_FIREFOX, "bundle/firefox");
      break;

    case "safari":
      await bundle(MANIFEST_FIREFOX, "bundle/firefox");

      let intervalId;
      let spinner = "\\";
      const startBuilding = () => {
        if (!canRenderSpinner) {
          console.log("Bundling Safari...");
          return;
        }

          let P = ["\\", "|", "/", "-"];
          intervalId = setInterval(() => {
            clearSpinnerLine();
            spinner = P[P.indexOf(spinner) + 1] || P[0];
            renderSpinner(`${spinner}   Bundling Safari...`);
          }, 250);
      };

      startBuilding();

      await runCommand(generateSafariProjectCommand, true);
      await runCommand(fixBundleIdentifierCommand, true);

      clearInterval(intervalId);
      break;

    case "all":
      await bundleAll();
      break;

    default:
      await bundleAll();
  }
};

const generateSafariProjectCommand = `xcrun safari-web-extension-converter bundle/firefox --project-location bundle/safari --app-name 'Minimal Twitter' --bundle-identifier 'com.typefully.minimal-twitter'`;

// The first command currently ignores the full --bundle-identifier flag (it still take the company name), so a replace is required to make sure it matches our bundle identifier
const fixBundleIdentifierCommand = `find "bundle/safari/Minimal Twitter" \\( -name "*.swift" -or -name "*.pbxproj" \\) -type f -exec sed -i '' 's/com.typefully.Minimal-Twitter/com.typefully.minimal-twitter/g' {} +`;

const browserArg = process.argv[2]?.trim();

if (browserArg) {
  await bundleBrowser(browserArg);
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Which browser would you like to bundle for? [All / Chrome / Firefox / Safari] ",
  async (browser) => {
    await bundleBrowser(browser);

    rl.close();
  }
);

rl.on("close", () => {
  process.exit(0);
});

/*--- Bundle without prompting
await bundleAll();
process.exit(0);
---*/
