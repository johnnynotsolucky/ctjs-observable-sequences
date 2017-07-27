import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, input, ul, li } from '@cycle/dom'
import './main.styl'

const toCoordinates = viewport => ({ x: viewport.width, y: viewport.height })

const hemisphere = side => o => {
  const hemisphere = o.width / 2
  return side > 0 ? o.x > hemisphere : o.x < hemisphere
}

const main = (sources) => {
  const viewport$ = sources.Viewport
    .map(toCoordinates)

  const vdom$ = viewport$
    .map(coordinates =>
      div('.container', [
        div('.coordinates', `${coordinates.x}x${coordinates.y}`)
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
