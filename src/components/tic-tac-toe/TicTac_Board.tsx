import * as React from 'react'
import { IXYPosition } from '.'
import { Board, ICell } from '../../modules/game'
import * as S from './TicTac.css'
import TicTacToeSimulator from './TicTac_Simulator'

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

interface IProps {
  size?: number,
}
interface IState {
  player: number,
  grid: number[][],
}

export default class TicTacBoard extends React.Component<IProps, IState> {
  static defaultProps = {
    size: 3,
  }

  simulator: any // tslint:disable-line no-any

  constructor(props: IProps) {
    super(props)
    const {size} = props
    this.simulator = new TicTacToeSimulator({size})

    this.state = {
      grid: this.simulator.grid,
      player: 1,
    }
  }

  handlePlayerMove = (e: MouseEvent<HTMLInputElement>, move: IXYPosition) => {
    e.preventDefault()
    this.simulator.onTurn(move)
    const turnProcessed = !this.simulator.error
    if (turnProcessed) {
      this.setState({
        grid: this.simulator.grid,
      })

      const {status, winner} = this.simulator
      if (status === 'fin') {
        this.handleGameWon(winner)
      } else if (status === 'tie') {
        this.handleGameTie()
      }
    } else {
      alert(`You cannot play {x:${move.x}, y: ${move.y}}`)
    }
  }

  handleGameWon(winner: number) {
    const alert = confirm(`Game Won by Player ${winner}`)
    if (alert) this.resetGame()
  }
  handleGameTie() {
    const alert = confirm('Game Tied')
    if (alert) this.resetGame()
  }
  resetGame() {
    this.simulator = new TicTacToeSimulator({size: this.props.size})
    this.setState({player: 1, grid: this.simulator.grid})
  }

  updateBoard(): ICell[] {
    const {grid} = this.simulator
    return extractPositionsFromGrid(grid).map(c => ({
      ...c,
      value: c.value,
    }))
  }
  render() {
    return <div>
      <Board
        height={this.props.size}
        width={this.props.size}
        positions={this.updateBoard()}
        onClick={this.handlePlayerMove}
        pieces={[
          <div className={[S.space].join(' ')} key={0} />,
          <div className={[S.space, S.piece, S.flex_center].join(' ')} key={0}>X</div>,
          <div className={[S.space, S.piece, S.flex_center].join(' ')} key={0}>0</div>,
        ]}
      />
    </div>
  }
}
