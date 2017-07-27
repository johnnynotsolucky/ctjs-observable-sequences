import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, input, ul, li } from '@cycle/dom'
import './main.styl'

const main = (sources) => {
  const click$ = sources.DOM
    .select('div.container')
    .events('click')
    .map(ev => ({ x: ev.x, y: ev.y }))

  const vdom$ = click$
    .startWith(null)
    .map(coordinates =>
      div('.container', [
        coordinates
        ? div('.coordinates', `${coordinates.x}x${coordinates.y}`)
        : null
      ])
    )

  return {
    DOM: vdom$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
})
