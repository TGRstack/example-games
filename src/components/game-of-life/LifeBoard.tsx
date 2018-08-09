import * as React from 'react'
import { Board, ICell } from '../../modules/game'
import * as SC from '../helpers/center.scss'
import * as S from './board.scss'
import LifeSimulator from './LifeSimulator'
import Life from './pieces/AliveOrganism'
import Dead from './pieces/DeadOrganism'
import NewLife from './pieces/NewOrganism'
import EmptySpace from './pieces/spaces/EmptySpace'

interface IProps {}

interface IState {
  curr: ICell[],
  // next: ICell[],
}

const extractPositionsFromGrid = (cells: number[][]) => {
  const result: ICell[] = []
  cells.forEach((y, yDex) => {
    y.forEach((cell, xDex) => {
      result.push({
        value: cell,
        x: xDex,
        y: yDex,
      })
    })
  })

  return result
}
const startingPositions = (() => {
  const startingValues = [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  return extractPositionsFromGrid(startingValues)
})()

export default class LifeBoard extends React.Component<IProps, IState> {
  height = 5
  width = 5
  simulator = new LifeSimulator({
    grid: this.liveOrDeadGrid(startingPositions)
  })

  constructor(props: IProps) {
    super(props)

    this.state = {
      curr: startingPositions,
      // next: [],
    }
  }

  liveOrDeadGrid(valuedXY: ICell[]) {
    const newBoard = Array.from(Array(this.height)).map(() => Array.from(Array(this.width)))
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

      return ({curr: nextPositions})
    })
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

  renderController() {
    const Button = ({
      label,
      onClick,
    }: {
      label: string,
      onClick?: (event: MouseEvent<HTMLInputElement>) => void
    }) => <div className={S.button} onClick={onClick}>{label}</div>
    return <div className={[S.container, SC.flex_spread].join(' ')}>
      <Button label="Next" onClick={() => this.nextTurn()} />
      {/* <Button label="1 per 2 seconds" />
      <Button label="1 per second" />
      <Button label="2 per second" />
      <Button label="5 per second" /> */}
    </div>
  }

  render() {
    /* Values - Pieces
     * 0 - Empty Cell
     * 1 - Seed Cell
     * 2 - Alive Cell
     * 3 - Dead Cell
    */

    return <div>
      <Board
        height={this.height}
        width={this.width}
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
    </div>
  }
}
