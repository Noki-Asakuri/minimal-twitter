# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open-source browser extension for Chrome, Firefox, and Safari that customizes the Twitter/X.com interface. Built by Typefully to provide a minimal, focused Twitter experience with customizable UI elements.

Repository: https://github.com/typefully/minimal-twitter

## Build and Development Commands

### Building the Extension

Requires [Bun](https://bun.sh/docs/installation).

- `bun install` - Installs dependencies for the root project, popup, and content scripts
- `bun run build` or `bun run bundle` - Builds and bundles the extension for all browsers (prompts for browser choice)
- Builds both popup (Vite + React + TypeScript) and content-scripts (Rolldown) automatically
- Creates bundled packages in `/bundle/` directory for Chrome, Firefox, and Safari

### Content Scripts (content-scripts/)

- `bun run content-scripts:watch` - Watch mode for content script development
- `bun run content-scripts:build` - Build content scripts only

### Popup UI (popup/)

- `bun run popup:dev` - Development server for popup UI (Vite)
- `bun run popup:build` - Build popup for production
- `cd popup && bun run typecheck` - Type-check popup TypeScript
- `bun run format:check` - Check formatting across the repository
- `bun run format` - Format the repository with Prettier

### Development Workflow

1. Run `bun install` at root once to install all workspace dependencies
2. Run `bun run build` at root once to build everything initially
3. For content-script changes: `bun run content-scripts:watch` (auto-rebuilds on save)
4. For popup changes: `bun run popup:build` (no watch mode, must rebuild manually)

**Important:** `bun run content-scripts:watch` builds to `content-scripts/dist/`, but the extension loads from `bundle/chrome/dist/`. To sync changes during development, either:

- Run `bun run build` at root after changes (slow, rebuilds everything)
- Or create a symlink once: `rm -rf bundle/chrome/dist && ln -s ../../content-scripts/dist bundle/chrome/dist`

Then load the extension in your browser (see below).

### Loading Extension for Testing

- Chrome/Edge: Load `bundle/chrome` folder at `chrome://extensions` (enable Developer mode)
- Firefox: Load `bundle/firefox/manifest.json` at `about:debugging#/runtime/this-firefox`

After making changes, refresh the extension in `chrome://extensions` to reload.

## Architecture

### Core Structure

**Three main parts:**

1. **content-scripts/**: Content scripts that run on x.com and apply customizations
2. **popup/**: Vite + React app for the extension settings popup UI
3. **Root files**: Build scripts, manifests, shared utilities

### Settings and Storage

- **storage-keys.js** (root): Central registry of all feature keys and default preferences
  - All settings keys must be added to both `allSettingsKeys` array and `defaultPreferences` object
  - Keys use format `Key[FeatureName]` (e.g., `KeySidebarLogo`)

### Content Script Flow

**Initialization** (content-scripts/src/modules/initialize.js):

1. Loads stylesheets (local + CDN in production)
2. Applies static features once
3. Runs dynamic features
4. Sets up MutationObserver for DOM changes
5. Extracts Twitter theme colors

**Features are categorized as static or dynamic:**

- **Static features** (content-scripts/src/modules/features/static.js):

  - Applied once on load or when settings change
  - Examples: timeline width, font changes, hide navigation buttons
  - Organized by category: timeline, navigation, interface, sidebar, advanced

- **Dynamic features** (content-scripts/src/modules/features/dynamic.js):
  - Reapplied on DOM mutations via MutationObserver
  - Examples: writer mode, view counts, Typefully integration buttons
  - Throttled to run max every 50ms

**Feature implementation files** (content-scripts/src/modules/options/):

- Each category has its own file (timeline.js, navigation.js, interface.js, etc.)
- Functions typically add/remove CSS classes or inject styles to enable/disable features

**Selectors** (content-scripts/src/selectors.js): **Critical file** containing all CSS selectors for Twitter UI elements. When Twitter changes their DOM structure, selectors break and need updating here. Selectors primarily use `data-testid` attributes (most stable), ARIA attributes, and structural CSS selectors. When fixing broken features, check this file first.

### Popup UI Structure

**Vite + React + TypeScript app** (popup/):

- `components/sections/`: Settings sections (TimelineSection, NavigationSection, etc.)
- `components/ui/`: Reusable UI components (switches, checkboxes, sliders)
- Uses Tailwind CSS v4 through the Vite plugin with theme tokens in `src/styles/globals.css`
- Uses Radix UI primitives and Stitches for styling
- Settings are saved to chrome.storage and synced to content scripts

## Adding a New Feature

To add a new feature toggle:

1. **Define the key** in `storage-keys.js`:

   - Add `export const KeyFeatureName = "featureName"`
   - Add to `allSettingsKeys` array
   - Add default value to `defaultPreferences` object

2. **Implement the feature logic** in appropriate file in `content-scripts/src/modules/options/`:

   - Create a function that applies the feature (usually adds/removes CSS classes)
   - Import and use utilities from `content-scripts/src/modules/utilities/`

3. **Register the feature**:

   - If static: Add to `staticFeatures` in `content-scripts/src/modules/features/static.js`
   - If dynamic: Add to `dynamicFeatures` in `content-scripts/src/modules/features/dynamic.js`
   - Import the key from storage-keys.js

4. **Add UI control** in appropriate section in `popup/components/sections/`:

   - Import the key from storage-keys.js
   - Add a toggle/switch/checkbox component that reads/writes to storage

5. **SVG assets**: If new icons are needed, add to `content-scripts/src/modules/svgAssets.js`

## CSS and Styling

- Main styles: `/css/main.css` and `/css/typefully.css`
- In production, extension loads cached versions from GitHub CDN
- In development mode, only loads local CSS files
- Content scripts inject styles dynamically via `addStyleSheet()` and `addStyles()` utilities

## Browser Compatibility

- Chrome: Manifest V3 with service worker background
- Firefox: Manifest V2 with background scripts
- Safari: Converted from Firefox build using xcrun safari-web-extension-converter
- Manifests defined in `bundle-extension.js`

## Releasing Updates

### Version Bump

1. Run `bun run bump-version` (prompts for patch/minor/major). This automatically updates:
   - `bundle-extension.js` - main version number
   - Xcode project (`project.pbxproj`) - MARKETING_VERSION and CURRENT_PROJECT_VERSION (build number incremented by 1)

2. Run `bun run build` to create bundles for all browsers

3. Commit and tag:

   ```bash
   git add . && git commit -m "Bump version to X.Y.Z"
   git tag vX.Y.Z
   git push && git push --tags
   ```

4. Submit bundles to browser stores (Chrome Web Store, Firefox Add-ons, App Store via Xcode)

### Update Screen Behavior

Controlled in `background.js`. By default, the welcome page only opens on fresh installs.

To show an update screen for major releases, modify `background.js`:

```js
// Show welcome page on both install AND update
if (object.reason !== "install" && object.reason !== "update") {
  return;
}

const targetUrl = `https://typefully.com/minimal-twitter/welcome${
  object.reason === "update" ? "?updated=true" : ""
}`;
```

To disable update screen (default):

```js
// Only show welcome page on fresh install
if (object.reason !== "install") {
  return;
}

const targetUrl = `https://typefully.com/minimal-twitter/welcome`;
```
