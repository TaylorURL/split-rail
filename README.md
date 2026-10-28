# Split Rail

The "Built by TaylorURL" footer bar on TaylorURL sites, as a React component.

<img src="https://img.shields.io/badge/version-2026.44.2-000000?style=for-the-badge" alt="Version 2026.44.2" />

It's the thin bar at the very bottom of a TaylorURL site's footer. The left side says "Built by TaylorURL" and links to [taylorurl.com](https://www.taylorurl.com). The right side has a Status link to the [status page](https://www.taylorurl.com/status), the site's version and the year.

Sites install it as a dependency instead of keeping their own copy, so a fix here reaches each site when it moves its pin.

## Using it

```bash
npm install github:TaylorURL/split-rail#v2026.36.0
```

Pin a tag. A site should only pick up a new bar when someone moves the pin on purpose.

Put it inside the footer element, not after it. It takes its colors from its parent, and outside the footer that's the page background.

```jsx
import SplitRail from '@taylorurl/split-rail'

<footer className="site-footer">
  {/* the rest of the footer */}
  <SplitRail version={__BUILD_VERSION__} />
</footer>
```

`version` is the build version to show, and the bar shows none without it. `year` overrides the year, which is almost never needed. `--tu-accent` sets the link hover color.

## Inside

It's one file, `src/index.js`, written with `createElement` instead of JSX so it runs untranspiled in Vite, Create React App and Next.js. The only peer dependency is React 17 or later.

The bar sets no background and no text color. Every tone is mixed from the parent's `currentColor` with `color-mix()`, which is how the same bar sits under a white footer and a near-black one. Its stylesheet is a `<style>` element rendered with the bar and scoped to `[data-taylorurl-bar]`, so there's no CSS import.

Under `pointer: coarse` each link grows to a 44 px square with padding, given back as negative margin, so only the tappable area changes. The bar itself goes from 40 to 45 px, the control plus the rule above it.

The year is read in `America/Chicago`, not the machine's zone. A build running in UTC would print next year for the last hours of December and disagree with the browser.

TaylorURL's site checks look for `[data-taylorurl-bar]`, `[data-tu-right]` and the `taylorurl.com` link. `npm test` renders the bar with `renderToStaticMarkup` and checks each one by name, because dropping one makes every site report the bar as missing.

```bash
npm install
npm test
npm run lint
npm run format:check
```

Proprietary, all rights reserved. See [LICENSE.md](LICENSE.md).
