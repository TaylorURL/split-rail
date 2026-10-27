<h1 align="center">Split Rail</h1>

<p align="center">The "Built by TaylorURL" footer bar on TaylorURL sites, as a React component.</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.38.0-000000?style=for-the-badge" alt="Version 2026.38.0" />
  <img src="https://img.shields.io/badge/React-17%2B-000000?style=for-the-badge&logo=react&logoColor=white" alt="React 17 or later" />
</p>

Split Rail is the thin bar at the very bottom of a TaylorURL site's footer. On the left it says "Built by TaylorURL" and links to [taylorurl.com](https://www.taylorurl.com). On the right it has a Status link to the [status page](https://www.taylorurl.com/status), the site's version and the year.

Each site installs it as a dependency instead of keeping its own copy, so a change here reaches every site when it bumps the version.

## What it does

- Picks up its colors from the footer it sits in, so it works on light and dark footers
- Shows the version you pass in, and the current year
- Gives the links bigger tap targets on touch screens
- Ships as plain JavaScript with no JSX, so it works in Vite, Create React App and Next.js without extra setup
- Has no dependencies apart from React 17 or later

## Install

```bash
npm install github:TaylorURL/split-rail#v2026.36.0
```

Pin a tag, so a site only picks up a new version of the bar when you move it.

## Usage

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

## Working on it

```bash
npm install
npm test
npm run lint
npm run format:check
```

`npm test` renders the component to HTML and checks the markup.

## License

Proprietary. All rights reserved. See [LICENSE.md](LICENSE.md).
