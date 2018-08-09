import * as cloneDeep from 'lodash.clonedeep'
import * as deepEqual from 'lodash.isequal'
import * as React from 'react'
import { ICell } from '.'
import { ReactChildrenArr } from '../../types/common'
import * as S from './Board.scss'

interface IXYPosition {y: number, x: number}

interface IProps {
  height?: number,
  label?: string,
  positions: ICell[],
  pieces: ReactChildrenArr,
  width?: number,
  onClick?: (event: MouseEvent<HTMLInputElement>, ...args: any[]) => void, // tslint:disable-line no-any
}

type BoardGrid = number[][]
interface IState {
  board: BoardGrid
}

export default class GameBoard extends React.Component<IProps, IState> {
  static defaultProps = {
    height: 10,
    label: 'Game Board',
    width: 10,
  }

  constructor(props: IProps) {
    super(props)

    let board = this.initBoard()
    board = this.updateBoard(board)
    this.state = {
      board,
    }
  }

  componentDidUpdate(np: IProps) {
    const cp = this.props
    if (!deepEqual(cp.positions, np.positions))  {
      this.setState(s => ({
        board: this.updateBoard(s.board)
      }))
    }
  }

  initBoard = () => Array.from(Array(this.props.height)).map(() => Array.from(Array(this.props.width)))

  updateBoard = (_board: BoardGrid): BoardGrid => {
    const newBoard = cloneDeep(_board)
    this.props.positions.forEach(cell => {
      const {x, y, value} = cell
      newBoard[y][x] = value
    })

    return newBoard
  }

  renderCell(value: number, dex:  string) {
    const getXY = (str: string): IXYPosition => {
      const parts = str.split('_')
      return {
        x: parseInt(parts[1], 10),
        y: parseInt(parts[0], 10),
      }
    }
    const {y, x} = getXY(dex)
    const {pieces} = this.props
    return <div
      className={[S.cell, S.flex_center].join(' ')}
      key={dex}
      onClick={e => this.props.onClick && this.props.onClick(e, {y, x})}
    >
      {pieces[value]}
    </div>
  }

  renderCells() {
    return this.state.board.map((rows: number[], row: number) =>
      rows.map((cell: number, col: number) => (
        this.renderCell(cell, `${row}_${col}`)
      )
    ))
  }

  render() {
    const {height, width} = this.props

    const cssGrid = {
      gridTemplateColumns: `repeat(${height}, 1fr)`,
      gridTemplateRows:    `repeat(${width}, 120px)`,
    }
    return <div
      className={[S.container, S.board].join(' ')}
      style={cssGrid}
    >
      {this.renderCells()}
    </div>
  }
}
