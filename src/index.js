import { createElement as h } from 'react'

/*
 * The rail names no ground and no ink. Every tone is mixed from the host's own
 * `currentColor` and the background stays transparent, so the band it sits in
 * shows through and one rail reads correctly under a white brochure footer and
 * a near-black dashboard one alike. `--tu-accent` is the single retargetable
 * colour, for a palette whose hover would otherwise fight the page.
 */
const STYLE = `
[data-taylorurl-bar] {
  --tu-accent: currentColor;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 40px;
  padding: 0 1rem;
  border-top: 1px solid color-mix(in srgb, currentColor 13%, transparent);
  background: transparent;
  font-size: 11px;
  letter-spacing: 0.04em;
  line-height: 1;
}
[data-taylorurl-bar] a {
  color: inherit;
  text-decoration: none;
  opacity: 0.62;
  transition: opacity 200ms ease, color 200ms ease;
}
[data-taylorurl-bar] a:hover,
[data-taylorurl-bar] a:focus-visible {
  opacity: 1;
  color: var(--tu-accent);
}
[data-taylorurl-bar] strong {
  font-weight: 600;
}
[data-taylorurl-bar] [data-tu-right] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.62;
  font-variant-numeric: tabular-nums;
}
@media (prefers-reduced-motion: reduce) {
  [data-taylorurl-bar] a {
    transition: none;
  }
}
/*
 * A rail with two links in it holds two controls, and a control a thumb has to
 * hit is 44px or it is a miss. The links take that height where the pointer is
 * coarse; a mouse keeps the 11px line it has always had.
 *
 * The width comes from padding and the padding is given back as negative
 * margin, so each link's margin box is the size it was: the gutter, the gap
 * between the right-hand items and the rule above them all stay where they
 * are, and only the area that answers a tap is bigger. The bar itself is the
 * one thing that grows, from 40px to 45 - the 44px control and the rule above
 * it - because a bar cannot be shorter than the controls inside it.
 */
@media (pointer: coarse) {
  [data-taylorurl-bar] {
    min-height: 44px;
  }
  [data-taylorurl-bar] a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding-inline: 0.5rem;
    margin-inline: -0.5rem;
  }
}
`

const HOME = 'https://www.taylorurl.com'
const STATUS = 'https://www.taylorurl.com/status'

function link(key, href, ...children) {
  return h('a', { key, href, target: '_blank', rel: 'noopener noreferrer' }, ...children)
}

/**
 * The rail takes its colours from the element above it, so its place is inside
 * the footer element. At the app root it inherits the page body instead and
 * reads as a pale strip under a dark footer.
 *
 * @param {{version?: string, year?: number}} props
 *   `version` is whatever build string the project already publishes, and is
 *   left off by a project that publishes none. `year` is for a server-rendered
 *   page, which can hand the rail the year its own render used rather than let
 *   the two straddle midnight.
 */
export default function SplitRail({ version, year } = {}) {
  const right = [
    link('s', STATUS, 'Status'),
    version ? h('span', { key: 'v' }, version) : null,
    h('span', { key: 'y', suppressHydrationWarning: true }, year || new Date().getFullYear()),
  ].filter(Boolean)

  return h(
    'div',
    { 'data-taylorurl-bar': true },
    h('style', null, STYLE),
    link('h', HOME, 'Built by ', h('strong', { key: 'm' }, 'TaylorURL')),
    h('div', { 'data-tu-right': true }, right)
  )
}
