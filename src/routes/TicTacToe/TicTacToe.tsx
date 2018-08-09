// tslint:disable max-line-length
import Gx from '@tgrx/gx'
import * as React from 'react'
import Helmet from 'react-helmet'
import {
  Board as TicTacToeBoard,
} from '../../components/tic-tac-toe'
// import * as S from './GameOfLife.css'

function TicTacToe() {
  return (
    <div>
      <Helmet>
        <title>Tic-Tac-Toe</title>
      </Helmet>

      {/* <Gx col={12}>
        <TicTacToeHeader />
      </Gx> */}
      <Gx col={12}>
        <TicTacToeBoard />
      </Gx>
    </div>
  )
}

export default TicTacToe
