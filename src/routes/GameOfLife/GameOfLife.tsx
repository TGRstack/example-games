// tslint:disable max-line-length
import Gx from '@tgrx/gx'
import * as React from 'react'
import Helmet from 'react-helmet'
import GameOfLifeBoard from '../../components/game-of-life/LifeBoard'
// import * as S from './GameOfLife.css'

function SimpleWizard() {
  return (
    <div>
      <Helmet>
        <title>Game of Life</title>
      </Helmet>

      <Gx col={12}>
        <GameOfLifeBoard />
      </Gx>
    </div>
  )
}

export default SimpleWizard
