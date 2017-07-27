import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, input, ul, li } from '@cycle/dom'
import './main.styl'

const toCoordinates = ev => ({ x: ev.x, y: ev.y })

const main = (sources) => {
  const click$ = sources.DOM
    .select('div.container')
    .events('click')
    .map(toCoordinates)
    .filter(({ x, y }) => x > 300 || y > 300)

  const vdom$ = click$
    .startWith(null)
    .map(coordinates =>
      div('.container', [
        div('.box'),
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
