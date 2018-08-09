import * as React from 'react'
import { Board, ICell } from '../../modules/game'
// import { Input } from '../form'
import * as SC from '../helpers/center.scss'
import * as S from './board.scss'
import LifeSimulator from './LifeSimulator'
import Life from './pieces/AliveOrganism'
import Dead from './pieces/DeadOrganism'
import NewLife from './pieces/NewOrganism'
import EmptySpace from './pieces/spaces/EmptySpace'
// const {Number: {label: NumberInput}} = Input

interface IProps {}

interface IState {
  curr: ICell[],
  start: ICell[],
  height: number,
  iterate: number,
  inProgress: boolean,
  width: number,
  // next: ICell[],
}

const extractPositionsFromGrid = (cells: number[][]) => {
  const result: ICell[] = []
  cells.forEach((y, yDex) => {
    y.forEach((cell = 0, xDex) => {
      result.push({
        value: cell,
        x: xDex,
        y: yDex,
      })
    })
  })

  return result
}

const starting = (() => {
  const defaultGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  return {
    height: defaultGrid.length,
    positions: extractPositionsFromGrid(defaultGrid),
    width: defaultGrid[0].length,
  }
})()

export default class LifeBoard extends React.Component<IProps, IState> {
  simulator = new LifeSimulator({
    grid: this.liveOrDeadGrid(starting.positions)
  })

  constructor(props: IProps) {
    super(props)
    this.state = {
      curr: starting.positions,
      height: starting.height,
      inProgress: false,
      iterate: 0,
      start: starting.positions,
      width: starting.width,
      // next: [],
    }
  }

  componentDidUpdate(_: IProps) { // , ns: IState
    const cs = this.state
    const {iterate} = cs

    // auto-play game
    if (iterate > 0) setTimeout(() => this.nextTurn(), iterate)

    // change board size
    // if ((ns.height !== cs.height) || (ns.width !== cs.width)) {
    //   this.rebuildBoard()
    // }
  }

  liveOrDeadGrid(valuedXY: ICell[]): number[][] {
    const {height, width} = this.state || {height: starting.height, width: starting.width}
    const newBoard = Array.from(Array(height)).map(() => Array.from(Array(width)))
    valuedXY.forEach(cell => {
      const {x, y, value} = cell
      let result = 0
      if (value === 2) result = 1
      newBoard[y][x] = result
    })

    return newBoard
  }

  nextTurn() {
    this.setState(s => {
      const next = this.simulator.next()
      const nextPositions = this.updateBoard(s.curr, next)

      return ({curr: nextPositions, inProgress: true})
    })
    if (this.state.iterate > 0) {
      this.setState({ iterate: 0 }, () =>
      // TODO: replace with this.timer = setInterval
      setTimeout(() => this.setState({
          curr: this.state.start,
          inProgress: false
      }),        1050))
    } else {
      this.setState({
        curr: this.state.start,
        inProgress: false
      })
    }
  }
  resetGame() {
    this.simulator = new LifeSimulator({
      grid: this.liveOrDeadGrid(this.state.start)
    })
    if (this.state.iterate > 0) {
      this.setState({ iterate: 0 }, () =>
      // TODO: replace with this.timer = setInterval
      setTimeout(() => this.setState({
          curr: this.state.start,
          inProgress: false
      }),        1050))
    } else {
      this.setState({
        curr: this.state.start,
        inProgress: false
      })
    }
  }
  updateBoard(_curr: ICell[], next: number[][]): ICell[] {
    const nextBoard = extractPositionsFromGrid(next).map(c => ({
      ...c,
      value: c.value === 1 ? 2 : 0,
    }))
    // const nextLiveCells: ICell[] = nextBoard.find(cell => cell.value === 2)
    // const currLiveCells: ICell[] = curr.find(cell => cell.value === 2)
    // // console.log({next, nextBoard})
    return nextBoard
  }
  // rebuildBoard() {
  //   const {height, width} = this.state
  //   const newGrid = Array.from(Array(height)).map(() => Array.from(Array(width)))
  //   const start = extractPositionsFromGrid(newGrid)
  //   console.log({height, width}, {newGrid, start})
  //   this.setState({curr: start, start})
  // }

  renderController() {
    const Button = ({
      label,
      onClick,
    }: {
      label: string,
      onClick?: (event: MouseEvent<HTMLInputElement>) => void
    }) => <div className={S.button} onClick={onClick}>{label}</div>
    return <div className={[S.container, SC.flex_spread].join(' ')}>
      <Button label="Reset" onClick={() => this.resetGame()} />
      <Button label="Stop" onClick={() => this.setState({iterate: 0})} />
      <Button label="Next" onClick={() => this.nextTurn()} />
      <Button label="1 FPS" onClick={() => this.setState({iterate: 1000})} />
      <Button label="2 FPS" onClick={() => this.setState({iterate: 500})} />
      <Button label="3 FPS" onClick={() => this.setState({iterate: 333})} />
    </div>
  }
  // renderSettings() {
  //   const Button = ({
  //     label,
  //     onClick,
  //   }: {
  //     label: string,
  //     onClick?: (event: MouseEvent<HTMLInputElement>) => void
  //   }) => <div className={S.button} onClick={onClick}>{label}</div>
  //   return <div className={[S.container, SC.flex_spread].join(' ')}>
  //     <NumberInput
  //       disabled={this.state.inProgress}
  //       max={1000}
  //       min={1}
  //       name="Height"
  //       label="Height"
  //       value={this.state.height}
  //       handleChange={height => this.setState({height})}
  //     />
  //     <NumberInput
  //       disabled={this.state.inProgress}
  //       max={1000}
  //       min={1}
  //       name="Width"
  //       label="Width"
  //       value={this.state.width}
  //       handleChange={width => this.setState({width})}
  //     />
  //   </div>
  // }

  render() {
    /* Values - Pieces
     * 0 - Empty Cell
     * 1 - Seed Cell
     * 2 - Alive Cell
     * 3 - Dead Cell
    */

    const {height, width} = this.state

    return <div>
      <Board
        height={height}
        width={width}
        positions={this.state.curr}
        pieces={[
          <EmptySpace key={0} />,
          <NewLife key={1} />,
          <Life key={2} />,
          <Dead key={3} />,
        ]}
        // nextChanges={this.state.next} highlight these cells
      />
      {this.renderController()}
      {/* {this.renderSettings()} */}
    </div>
  }
}
