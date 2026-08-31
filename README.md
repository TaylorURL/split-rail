<h1 align="center">Split Rail</h1>

<p align="center">
  <b>The attribution rail that closes every TaylorURL site.</b>
</p>
<p align="center">
  One React component, imported by every project,<br />
  so changing the bar changes every site at once.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.35.4-000000?style=for-the-badge" alt="Version 2026.35.4" />
  <img src="https://img.shields.io/badge/React-17%2B-000000?style=for-the-badge&logo=react&logoColor=white" alt="React 17 or later" />
  <img src="https://img.shields.io/badge/dependencies-none-000000?style=for-the-badge" alt="No dependencies" />
</p>

<br />

## Why it is a package

A rail each project carries its own copy of is a rail nobody can change. Copies
drift in path, in length and in markup, and the bar that is supposed to be one
bar becomes as many bars as there are sites. Here it is one file with one
version, and a site takes a change by moving the dependency.

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3 align="center">It paints nothing</h3>
      <p align="center">No ground and no ink of its own. Every tone is mixed from the host's <code>currentColor</code> and the background stays transparent, so one rail lands correctly on a white brochure footer and a near-black dashboard alike.</p>
    </td>
    <td width="50%" valign="top">
      <h3 align="center">It builds nowhere</h3>
      <p align="center">Plain <code>React.createElement</code>, no JSX and no build step, so Vite, Create React App and Next.js all consume the published source as it stands.</p>
    </td>
  </tr>
</table>

<br />

## Install

```bash
npm install github:TaylorURL/split-rail#v2026.35.1
```

Pin the tag. Every consuming site does, which is what makes a new rail something a
site takes by moving its dependency rather than something that arrives on the next
install.

React 17 or later is a peer dependency; the package brings nothing else with it.

## Use

Mount it inside the footer element, not beside it.

```jsx
import SplitRail from '@taylorurl/split-rail'

<footer className="site-footer">
  {/* the footer's own content */}
  <SplitRail version={__BUILD_VERSION__} />
</footer>
```

| Prop      | Type     | Does                                                                                       |
| :-------- | :------- | :----------------------------------------------------------------------------------------- |
| `version` | `string` | The build string the project already publishes. Left off, the rail shows no version.       |
| `year`    | `number` | The year a server render used, so a page built either side of midnight agrees with itself. |

The rail takes its colours from the element above it, which is why its place is
inside the footer. At the app root it inherits the page body instead and reads
as a pale strip under a dark footer.

`--tu-accent` is the one colour a host can retarget, for a palette whose hover
would otherwise fight the page.

## Shipping plain JavaScript

`src/index.js` calls `React.createElement` rather than using JSX. Two of the
consuming sites build with `react-scripts`, which does not transpile JSX inside
`node_modules`, so a JSX source file would fail their builds.

## Checking a change

`rail-test.mjs` renders the component to static markup, with a version and
without, and prints the result along with the attributes the stack checklist's
rail probe looks for. It is run by hand against a checkout that has `react` and
`react-dom` installed:

```bash
npm install --no-save react react-dom
node rail-test.mjs
```

It prints; it asserts nothing and sets no exit code, so read the output. The
package declares no `test` script, and CI installs the package and stops there.

## Project structure

```
split-rail/
├── src/index.js      The component, its stylesheet, and the two links it carries
├── rail-test.mjs     Hand-run render check
└── package.json      Exports src/index.js directly; React is a peer dependency
```

## License

Copyright (c) 2026 Trenton Taylor. All rights reserved.

<br />

<p align="center">
  <sub>One bar, one version, every site.</sub>
</p>
