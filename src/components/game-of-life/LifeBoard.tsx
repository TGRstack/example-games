import * as React from 'react'
import { Board, ICell } from '../../modules/game/'

interface IProps {
  label: string,
}

interface IState {
  curr: ICell[],
  next: ICell[],
}

const startingPositions = (() => {
  const startingValues = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
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
  static defaultProps = {
    label: 'text',
  }

  constructor(props: IProps) {
    super(props)

    this.state = {
      curr: startingPositions,
      next: [],
    }
  }

  // onNext() {
  //   const next: ICell[] = []
  //   this.setState({next})
  // }

  render() {
    return <Board
      height={5}
      width={5}
      pieces={this.state.curr}
      // nextChanges={this.state.next} highlight these cells
    />
  }
}
