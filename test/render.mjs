import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import SplitRail from '../src/index.js'

/*
 * The markup below is not arbitrary: rail-probe.js finds the rail by
 * `[data-taylorurl-bar]`, counts attribution links by `a[href*="taylorurl.com"]`
 * excluding `/status`, and reads the right-hand group by `[data-tu-right]`. A
 * change here that drops one of those makes the stack checklist report the rail
 * as absent on every site at once, so each is asserted by name.
 */
const cases = []

function check(name, ok, detail) {
  cases.push({ name, ok, detail })
}

const withVersion = renderToStaticMarkup(createElement(SplitRail, { version: '2026.35.3' }))
const bare = renderToStaticMarkup(createElement(SplitRail))
const dated = renderToStaticMarkup(createElement(SplitRail, { year: 2019 }))

check('carries the rail marker the probe finds it by',
  withVersion.includes('data-taylorurl-bar'), withVersion.slice(0, 60))
check('carries the right-hand group marker',
  withVersion.includes('data-tu-right'), 'no [data-tu-right]')
check('links home',
  withVersion.includes('href="https://www.taylorurl.com"'), 'no home link')
check('links to status',
  withVersion.includes('href="https://www.taylorurl.com/status"'), 'no status link')

// The probe counts attribution links excluding /status, and expects exactly one
// per rail. Two would read as a hand-rolled credit sitting beside the shared bar.
const attribution = (withVersion.match(/href="https:\/\/www\.taylorurl\.com"/g) || []).length
check('signs the page exactly once', attribution === 1, `${attribution} attribution link(s)`)

check('shows the version it was given', withVersion.includes('2026.35.3'), 'version missing')
check('omits the version when given none', !/\d+\.\d+\.\d+/.test(bare), bare)
check('shows the year it was given', dated.includes('2019'), 'year not honoured')
check('falls back to the current year',
  bare.includes(String(new Date().getFullYear())), 'no year rendered')

// It must declare no colour of its own: the ground it shows is the footer's.
check('paints no ground', withVersion.includes('background: transparent'), 'ground is painted')
check('mixes its ink from the host', withVersion.includes('currentColor'), 'ink is hardcoded')

const failed = cases.filter(c => !c.ok)
for (const c of cases) console.log(`${c.ok ? 'ok  ' : 'FAIL'} ${c.name}${c.ok ? '' : ` — ${c.detail}`}`)
console.log(`\n${cases.length} case(s), ${failed.length} failing`)
process.exit(failed.length ? 1 : 0)
