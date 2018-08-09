import * as React from 'react'
import * as S from './TicTacToe.css'

import { flat } from '../helpers/array'

interface IProps {
  positions?: numbArr[],
}

interface IXYPosition {row: number, col: number}
type numbArr = number[]
type truthyNumber = boolean | number
interface IState {
  winner: number,
  positions: numbArr[],
  player: number,
}

// tslint:disable-next-line no-any
const sumArray = (arr: any[]) => arr.reduce((t: number, n: number) => t += n)

export class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      player: 1,
      positions: props.positions || [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      winner: 0,
    }
  }

  handlePlayerMove = (e: React.SyntheticEvent, {row, col}: IXYPosition) => {
    e.preventDefault()

    this.setState(s => {
      const currPlayer = s.player + 0

      const positions = [...s.positions]
      positions[row][col] = currPlayer

      const player = currPlayer === 1 ? 2 : 1
      return { positions, player }
      },          () => this.handleNextTurn()
    )
  }

  handleNextTurn() {
    // minimum number of terms is at least 5 (3+2)
    // the sum of the positions grid after 5 turns is 3 + 2*2 = 7
    // the sum of the positions grid after 9 turns is 5 + 4*2 = 13
    const turnPoints = sumArray(flat(this.state.positions))
    const isEnoughTurns = turnPoints >= 7
    const isMaxTurns = turnPoints === 13

    if (!isEnoughTurns) return

    // Enough truns have passed for their to be a winner
    const status = {
      across:    this.checkAcross(),
      // down:      this.checkDown(),
      // diagonal:  this.checkDiagonal(),
    }
    const isWinner = Object.values(status).reduce((win: boolean, n) =>
      win === false
      ? n.winner > 0
      : win
      ,                                           false
    )
    if (isMaxTurns && !isWinner) return this.handleGameTie()
    if (!isWinner) return

    // There's a winner!
    const {winner} = Object.values(status).filter(n => !!n.winner)[0]
    this.handleGameWon(winner)
  }

  handleGameWon(winner: number) {
    alert(`Game Won by Player ${winner}`)
  }
  handleGameTie() {
    alert('Game Tied')
  }
  public checkAcross(debugPositions?: numbArr[]) {
    const {positions} = this.state || {positions: debugPositions}
    const rowsFilled: boolean[] = []
    const rowsPointed: number[] = []

    positions.forEach((row: number[], i: number) => { // [0, 1, 2]
      rowsFilled[i] = row.reduce((t, n) => !!t ? n > 0 : false, true)
      rowsPointed[i] = sumArray(row)
    })

    // only handles 1 row being filled
    const completedRow = rowsFilled.indexOf(true)
    let winner: truthyNumber = false
    switch (rowsPointed[completedRow]) {
      case 3:
        winner = 1
        break
      case 6:
        winner = 2
        break
      default:
        winner = 0
        break
    }

    return {
      winner,
    }
  }

  renderCell(cell: number, dex:  string) {
    const getRowCol = (str: string): IXYPosition => {
      const parts = str.split('_')
      return {
        col: parseInt(parts[1], 10),
        row: parseInt(parts[0], 10),
      }
    }
    const {row, col} = getRowCol(dex)
    return <div
      className={[S.cell, S.flex_center].join(' ')}
      key={dex}
      onClick={e => this.handlePlayerMove(e, {row, col})}
    >
      {cell}
    </div>
  }
  renderBoard() {
    return <div className={[S.board].join(' ')}>
      {this.state.positions.map((rows: number[], row: number) =>
        rows.map((cell: number, col: number) => (
          this.renderCell(cell, `${row}_${col}`)
        )
      ))}
    </div>
  }
  render() {
    return <div className={[S.container].join(' ')}>
      {this.renderBoard()}
    </div>
  }
}
