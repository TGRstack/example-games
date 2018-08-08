// tslint:disable max-line-length
import Gx from '@tgrx/gx'
import * as React from 'react'
import Helmet from 'react-helmet'
import {
  Board as GameOfLifeBoard,
  Legend as GameOfLifeLegend,
} from '../../components/game-of-life'
// import * as S from './GameOfLife.css'

function GameOfLife() {
  return (
    <div>
      <Helmet>
        <title>Game of Life</title>
      </Helmet>

      <Gx col={12}>
        <GameOfLifeBoard />
      </Gx>
      <Gx col={12}>
        <GameOfLifeLegend />
      </Gx>
    </div>
  )
}

export default GameOfLife
