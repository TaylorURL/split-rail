import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import SplitRail from './src/index.js'

const withVersion = renderToStaticMarkup(createElement(SplitRail, { version: '2026.35.3' }))
const bare = renderToStaticMarkup(createElement(SplitRail))
console.log('WITH VERSION len', withVersion.length)
console.log(withVersion.replace(/<style>[\s\S]*?<\/style>/, '<style>…</style>'))
console.log('---')
console.log('BARE has version span:', /2026\.35\.3/.test(bare))
console.log('has data-taylorurl-bar:', /data-taylorurl-bar/.test(bare))
console.log('has status link:', /taylorurl\.com\/status/.test(bare))
