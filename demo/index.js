import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'
import concat from 'xstream/extra/concat'
import buffer from 'xstream/extra/buffer'
import sampleCombine from 'xstream/extra/sampleCombine'
import dropUntil from 'xstream/extra/dropUntil'
import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { a, div, label, img } from '@cycle/dom'
import './main.styl'

const images = {
  cat: require('file-loader!./images/cat.png'),
  cat_won: require('file-loader!./images/cat_won.png'),
  dog: require('file-loader!./images/dog.png')
}

const sequentialArray = n => Array.from(new Array(n), (_, i) => i)

const toCoordinates = ev => ({ x: ev.x, y: ev.y })

const random = max => () => Math.floor(Math.random() * max)

const hemisphere = side => o => {
  const hemisphere = o.width / 2
  return side < 0 ? o.x < hemisphere : o.x > hemisphere
}

const directionKey = direction => ev => ev.code === direction

const main = shape => (sources) => {
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

  const left$ = xs.merge(
      viewportClick$.filter(hemisphere(-1)),
      sources.KeyPress.filter(directionKey('ArrowLeft'))
    )
    .mapTo(-1)
  const right$ = xs.merge(
      viewportClick$.filter(hemisphere(1)),
      sources.KeyPress.filter(directionKey('ArrowRight'))
    )
    .mapTo(1)

  const sync$ = xs.periodic(500)
    .compose(dropUntil(sources.KeyPress))

  const moveLeft = (current, move) => current > 0 ? current + move : current
  const moveRight = (max, current, move) => current < max - 1 ? current + move : current
  const movePlayer = max => (current, move) =>
    move < 0 ? moveLeft(current, move) : moveRight(max, current, move)

  const playerPosition$ = xs.merge(left$, right$)
    .compose(buffer(sync$))
    .filter(arr => arr.length > 0)
    .map(arr => arr[arr.length - 1])
    .fold(movePlayer(shape.lanes), 1)

  const enemyState$ = sync$
    .map(random(shape.lanes))
    .fold((acc, pos) => {
      // New kittehs go to the front of the pos array
      const positions =
          [pos] // Still better than slice()
          .concat(acc.positions
          .slice(0, shape.rows))
      // +1 because I'm lazy and added an extra row for doggeh
      const missed = positions.length === shape.rows + 1
        ? acc.missed + 1
        : acc.missed
      return { positions, missed }
    }, { positions: [], missed: 0 })

  // Merge player and enemy states and determine death
  const state$ = enemyState$
    .compose(sampleCombine(playerPosition$))
    .map(([ enemyState, player ]) => ({
      player,
      enemyPositions: enemyState.positions,
      missed: enemyState.missed,
      dead: enemyState.positions[shape.rows] !== undefined &&
        player === enemyState.positions[shape.rows]
    }))

  // Overall game state; Just indicate game over
  const gameState$ = concat(
      state$.endWhen(state$.filter(state => state.dead)),
      xs.of({ dead: true })
    )

  // Use these to map out the cells for game elements
  const lanes = sequentialArray(shape.lanes)
  const rows = sequentialArray(shape.rows + 1) // Extra row for our dog.

  const placePlayer = player => lane =>
    lane === player
    ? div('.lane.player', [img({ attrs: { src: images.dog } })])
    : div('.lane')

  const placeEnemy = (positions, row) => lane =>
    positions[row] !== undefined && positions[row] === lane
    ? div('.lane.enemy', [img({ attrs: { src: images.cat } })])
    : div('.lane')

  // Intentionally verbose, maybe over complicated though
  const vdom$ = gameState$
    .startWith(null)
    .map(state =>
      state
      ? div('.container', [
        div('.rows',
          state.dead
          ? [div('.gameover', [
            img({ attrs: { src: images.cat_won } }),
            div('Oh noes')
          ])]
          : rows
            .map(row =>
              row === rows.length - 1
              ? div('.row.player', lanes.map(placePlayer(state.player)))
              : div('.row', lanes.map(placeEnemy(state.enemyPositions, row)))
            )
        ),
        div('.score', [
          div(state.missed)
        ])
      ])
      : div('.container', [
        div('.rows', [
          div('.start', 'Press any key to start')
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

run(main({ lanes: 3, rows: 10 }), {
  DOM: makeDOMDriver('#app'),
  Viewport: viewportDriver,
  KeyPress: () => fromEvent(document.body, 'keyup')
})
