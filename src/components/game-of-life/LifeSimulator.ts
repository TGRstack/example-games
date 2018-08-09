interface IProps {
  grid: number[][]
}

interface IXYPosition {
  x: number,
  y: number,
}

function findFreqOf(arr: number[], target: number) {
  const frequency: {[key: number]: number} = {}
  arr.forEach(v => frequency[v] = (frequency[v] || 0) + 1)
  return frequency[target]
}

export default class LifeSimulator {
  grid: number[][]
  height: number
  width: number

  constructor({
    grid = [[]]
  }: IProps) {
    this.grid = grid
    this.height = grid.length
    this.width = grid[0].length
  }

  getNeighbors(pos: IXYPosition) {
    const isYPos = n => {
      if (n < 0) {
        return false
      } else if (n >= this.height) {
        return false
      }

      return true
    }
    const isXPos = n => {
      if (n < 0) {
        return false
      } else if (n >= this.width) {
        return false
      }

      return true
    }

    const left = pos.x - 1
    const mid = pos.x
    const right = pos.x + 1

    const top = pos.y - 1
    const cent = pos.y
    const bot = pos.y + 1

    const isAlive = (y, x) => {
      return isYPos(y) && isXPos(x)
      ? this.grid[y][x]
      : 0
    }

    const topLeft =  isAlive(top, left)
    const cenLeft =  isAlive(cent, left)
    const botLeft =  isAlive(bot, left)

    const topMid =   isAlive(top, mid)
    const botMid =   isAlive(bot, mid)

    const topRight = isAlive(top, right)
    const cenRight = isAlive(cent, right)
    const botRight = isAlive(bot, right)

    const positions = [
      topLeft,
      cenLeft,
      botLeft,
      topMid,
      botMid,
      topRight,
      cenRight,
      botRight,
    ]
    const neighborsAmount = findFreqOf(positions, 1) || 0
    return neighborsAmount
  }
  onLivingCell(pos: IXYPosition) {
    /* Rules
     * 2 || 3 live neighbours will remain alive
     * < 2    live neighbours will die.
     * > 3    live neighbours will die.
    */
    const neighborsAmount = this.getNeighbors(pos)

    if (neighborsAmount === 2
      || neighborsAmount === 3) {
        return 1
    }

    return 0
  }
  onDeadCell(pos: IXYPosition) {
    /* Rules
     * 3      live neighbours will become alive
    */
    const neighborsAmount = this.getNeighbors(pos)
    return neighborsAmount === 3 ? 1 : 0
  }
  next() {
    const result = this.initBoard()
    this.grid.forEach((rows: number[], rowDex: number) => {
      rows.forEach((cell: number, colDex: number) => {
        const pos = {x: colDex, y: rowDex}
        result[rowDex][colDex] = !!cell  // 1 || 0
          ? this.onLivingCell(pos)
          : this.onDeadCell(pos)
      })
    })

    this.grid = result
    return result
  }

  initBoard = () => Array.from(Array(this.height)).map(() => Array.from(Array(this.width)))
}
