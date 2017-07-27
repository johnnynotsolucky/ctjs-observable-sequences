import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, input, ul, li } from '@cycle/dom'
import './main.styl'

const toCoordinates = ev => ({ x: ev.x, y: ev.y })

const hemisphere = side => o => {
  const hemisphere = o.width / 2
  return side < 0 ? o.x < hemisphere : o.x > hemisphere
}

const main = (sources) => {
  const click$ = sources.DOM
    .select('div.container')
    .events('click')
    .map(toCoordinates)

  const viewport$ = sources.Viewport

  const viewportClick$ = xs.combine(click$, viewport$)
    .map(([clickEvent, viewport]) => ({
      x: clickEvent.x,
      y: clickEvent.y,
      width: viewport.width,
      height: viewport.height
    }))
  const left$ = viewportClick$.filter(hemisphere(-1)).mapTo(-1)
  const right$ = viewportClick$.filter(hemisphere(1)).mapTo(1)

  const moveLeft = (pos, side) => pos > 0 ? pos + side : pos
  const moveRight = (pos, side) => (pos < 2 ? pos + side : pos)
  const playerPosition$ = xs.merge(left$, right$)
    .fold((pos, side) =>
      side < 0
        ? moveLeft(pos, side)
        : moveRight(pos, side)
      , 1) // start in the centre

  const vdom$ = playerPosition$
    .startWith(null)
    .map(coordinates =>
      div('.container', [
        div('.box'),
        div('.coordinates', [
          div(`Lane: ${coordinates}`),
        ])
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
