import * as React from 'react'
import { Board, ICell } from '../../modules/game'
import Life from './pieces/AliveOrganism'
import Dead from './pieces/DeadOrganism'
import NewLife from './pieces/NewOrganism'
import EmptySpace from './pieces/spaces/EmptySpace'

interface IProps {}

interface IState {
  curr: ICell[],
  // next: ICell[],
}

const startingPositions = (() => {
  const startingValues = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  const result: ICell[] = []
  startingValues.forEach((y, yDex) => {
    y.forEach((cell, xDex) => {
      result.push({
        value: cell,
        x: xDex,
        y: yDex,
      })
    })
  })

  return result
})()

export default class LifeBoard extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    this.state = {
      curr: startingPositions,
      // next: [],
    }
  }

  // onNext() {
  //   const next: ICell[] = []
  //   this.setState({next})
  // }

  render() {
    /* Values - Pieces
     * 0 - Empty Cell
     * 1 - Seed Cell
     * 2 - Alive Cell
     * 3 - Dead Cell
    */

    return <div>
      <Board
        height={5}
        width={5}
        positions={this.state.curr}
        pieces={[
          <EmptySpace key={0} />,
          <NewLife key={1} />,
          <Life key={2} />,
          <Dead key={3} />,
        ]}
        // nextChanges={this.state.next} highlight these cells
      />
      {/* TODO: <GameController /> */}
    </div>
  }
}
