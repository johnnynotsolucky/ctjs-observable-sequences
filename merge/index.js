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

  const viewportClick$ = xs.combine(click$, sources.Viewport)
    .map(([clickEvent, viewport]) => ({
      x: clickEvent.x,
      y: clickEvent.y,
      width: viewport.width,
      height: viewport.height
    }))

  const left$ = viewportClick$
    .filter(hemisphere(-1))
    .mapTo(-1)
  const right$ = viewportClick$
    .filter(hemisphere(1))
    .mapTo(1)

  const direction$ = xs.merge(left$, right$)

  const vdom$ = direction$
    .startWith(null)
    .map(direction =>
      div('.container', [
        div('.box'),
        direction
        ? div('.direction', [
            div(direction < 0 ? 'Left' : 'Right')
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
    stop: () => window.removeEventListener(eventListener)
  })
}

run(main, {
  DOM: makeDOMDriver('#app'),
  Viewport: viewportDriver
})
