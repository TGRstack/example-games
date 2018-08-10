import { arrDiags, arrMatrix, sumArray, transf90 } from '../helpers/array' // , flatArray

interface IProps {
  size?: number,
}
interface IXYPosition {
  x: number,
  y: number,
}

export default class TicTacToeSimulator {
  height: number
  width: number
  grid: number[][]
  currMove: IXYPosition = {y: 0, x: 0}
  currPlayer: 1 | 2 = 1
  winner: 0 | 1 | 2 = 0
  turns = 0
  status: 'new' | 'dirty' | 'inc' | 'fin' | 'tie' = 'new'
  winningPositions?: number[]
  error = false

  constructor({
    size = 3,
  }: IProps = {}) {
    this.height = size
    this.width =  size
    this.grid = this.initBoard()
  }

  initBoard = () => arrMatrix(this.height, this.width)

  // LIFECYCLE
  onTurn(move: IXYPosition) {
    // IF status === new || inc
    this.currMove = move
    if (this.checkNewMove()) {
      this.error = false
      this.performMove()

      this.isEnoughTurns()
      const enoughMoves = this.status === 'inc'
      if (enoughMoves && this.isWinner()) {
        // stop game
        this.declareWinner()
      } else if (enoughMoves && this.isTied()) {
        // stop game
        this.status = 'tie'

      } else {
        // continue game
        this.nextPlayer()
      }
    } else {
      this.error = true
    }
  }
  checkNewMove() {
    const {y, x} = this.currMove
    return this.grid[y][x] === 0
  }
  performMove() {
    const {y, x} = this.currMove
    this.grid[y][x] = this.currPlayer
    this.turns += 1
  }
  nextPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1
  }
  declareWinner() {
    this.status = 'fin'
    this.winner = this.currPlayer
  }

  // CHECKS
  isEnoughTurns() {
    const res = this.turns >= 5
    this.status = res ? 'inc' : 'dirty'
    return res
  }
  isTied() {
    const maxMoves = this.turns === (this.width * this.height)
    // TODO:  const winsPossible =

    return maxMoves // || winsPossible
  }
  isWinner() {
    const isAcross = this.isWinnerAcross()
    const isDown = this.isWinnerDownwards()
    const isDiag = this.isWinnerDiagonally()
    return isAcross || isDown || isDiag
  }
  isWinnerAcross() {
    const filledRows: number[][] = this.getPaths(this.grid)
    return this.isWinningPath(filledRows)
  }
  isWinnerDownwards() {
    const grid90 = transf90(this.grid)
    const filledCols: number[][] = this.getPaths(grid90)
    return this.isWinningPath(filledCols)
  }
  isWinnerDiagonally() {
    const grid45 = arrDiags(this.grid)
    const filledDiags: number[][] = this.getPaths(grid45)
    return this.isWinningPath(filledDiags)
  }
  getPaths(arr: number[][]) {
    const paths: number[][] = []
    arr.forEach(row => {
      const filledPath = row.indexOf(0) === -1
      if (filledPath && row.length === this.width) {
        paths.push(row)
      }
    })
    return paths
  }
  isWinningPath(arr: number[][]) {
    let result = false
    arr && arr.forEach(row => {
      const arrSum = sumArray(row)
      if (arrSum === this.width || arrSum === 2 * this.width) {
        this.winningPositions = row
        result = true
      }
    })
    return result
  }
}
