import * as React from 'react'
import { Link } from 'react-router-dom'

import * as S from './Header.scss'
import Header from './HeaderLeftRight'

class HeaderIndex extends React.Component<{}, {}> {
  render() {
    const left = [
      <Link to="/">
        <span className={S.text}>TGR Games</span>
      </Link>,                    // tslint:disable-line jsx-key
    ]
    const right = [
      <Link to="/game-of-life">Life</Link>, // tslint:disable-line jsx-key
      <Link to="/tic-tac-toe">TicTacToe</Link>, // tslint:disable-line jsx-key
    ]

    return <Header leftItems={left} rightItems={right}/>
  }
}

export default HeaderIndex
