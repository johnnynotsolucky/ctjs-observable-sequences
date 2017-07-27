import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, input, ul, li } from '@cycle/dom'
import './main.styl'

const toCoordinates = ev => ({ x: ev.x, y: ev.y })

const hemisphere = side => o => {
  const hemisphere = o.height / 2
  return side < 0 ? o.y > hemisphere : o.y < hemisphere
}

const main = (sources) => {
  const click$ = sources.DOM
    .select('div.container')
    .events('click')
    .map(toCoordinates)

  const viewport$ = sources.Viewport

  const bottom$ = xs.combine(click$, viewport$)
    .map(([clickEvent, viewport]) => ({
      x: clickEvent.x,
      y: clickEvent.y,
      width: viewport.width,
      height: viewport.height
    }))
    .filter(hemisphere(-1))

  const vdom$ = bottom$
    .startWith(null)
    .map(coordinates =>
      div('.container', [
        div('.box'),
        coordinates
        ? div('.coordinates', [
            div(`${coordinates.x}x${coordinates.y}`),
            div('.viewport', `${coordinates.width}x${coordinates.height}`)
          ])
        : null
      ])
    )

  return {
    DOM: vdom$,
  }
}

const viewportDriver = () => {
  const getDimentions = el => ({ width: el.innerWidth, height: el.innerHeight })

  let eventListener
  return xs.create({
    start: (listener) => {
      listener.next(getDimentions(window))
      eventListener = ev => {
        listener.next(getDimentions(ev.target))
      }
      window.addEventListener('resize', eventListener)
    },
    stop: () => window.removeEventListener('resize', eventListener)
  })
}

run(main, {
  DOM: makeDOMDriver('#app'),
  Viewport: viewportDriver
})
