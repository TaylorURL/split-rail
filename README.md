# Split Rail

The "Built by TaylorURL" footer bar on TaylorURL sites, as a React component.

<img src="https://img.shields.io/badge/version-2026.44.1-000000?style=for-the-badge" alt="Version 2026.44.1" />

Split Rail is the thin bar at the very bottom of a TaylorURL site's footer. On the left it says "Built by TaylorURL" and links to [taylorurl.com](https://www.taylorurl.com). On the right it has a Status link to the [status page](https://www.taylorurl.com/status), the site's version and the year.

Each site installs it as a dependency instead of keeping its own copy, so a change here reaches every site when it bumps the version.

## How it works

One file, `src/index.js`. It uses `createElement` instead of JSX so it runs untranspiled in Vite, Create React App and Next.js. The only peer dependency is React 17 or later.

- **Colors come from the host.** The bar sets no background and no text color. Every tone is mixed from the parent's `currentColor` with `color-mix()`, so the same bar works under a white footer and a near-black one. `--tu-accent` is the one color a site can change, for link hover.
- **Styles ship with it.** The stylesheet is a `<style>` element rendered with the bar and scoped to `[data-taylorurl-bar]`. No CSS import, no build step.
- **Touch targets.** Under `pointer: coarse` each link grows to 44 by 44 px with padding, given back as negative margin. Only the tappable area grows. The bar goes from 40 to 45 px: the 44 px control plus the rule above it.
- **Year without hydration drift.** The year is read in `America/Chicago`, not the machine's zone. A build in UTC would print next year for the last hours of December and disagree with the browser. The span also has `suppressHydrationWarning`.
- **Stable markers.** TaylorURL's site checks find the bar by `[data-taylorurl-bar]`, the right side by `[data-tu-right]`, and the credit by its `taylorurl.com` link. `npm test` renders it with `renderToStaticMarkup` and checks each marker by name. Drop one and every site reports the bar as missing.

<details>
<summary>Install</summary>

```bash
npm install github:TaylorURL/split-rail#v2026.36.0
```

Pin a tag, so a site only picks up a new version of the bar when you move it.

</details>

<details>
<summary>Usage</summary>

Put it inside the footer element, not after it. It takes its colors from its parent, so outside the footer it picks up the page background instead.

```jsx
import SplitRail from '@taylorurl/split-rail'

<footer className="site-footer">
  {/* the rest of the footer */}
  <SplitRail version={__BUILD_VERSION__} />
</footer>
```

| Prop      | Type     | What it does                                      |
| :-------- | :------- | :------------------------------------------------ |
| `version` | `string` | The build version to show. Leave it off for none. |
| `year`    | `number` | Overrides the year. You'll rarely need it.        |

To change the hover color of the links, set the `--tu-accent` CSS variable.

</details>

<details>
<summary>Working on it</summary>

```bash
npm install
npm test
npm run lint
npm run format:check
```

`npm test` renders the component to HTML and checks the markup.

</details>

## Built with

Plain JavaScript and React, with the styles inlined in the component.

<details>
<summary>License</summary>

Proprietary. All rights reserved. See [LICENSE.md](LICENSE.md).

</details>
