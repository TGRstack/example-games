import Gx from '@tgrx/gx'
import * as React from 'react'
import Helmet from 'react-helmet'

import Hello from '../../components/hello'
import List from '../../components/list'
import * as S from './Home.css'

function HomeEntrancePage() {
  return (
    <div className={S.container}>
      <Helmet>
        <title>Homepage</title>
      </Helmet>

      <Gx col={12}>
        <List ordered>
          {Hello('"Game of Life" to get Started')}
          {Hello('"Tic Tac Toe" for some interactive fun')}
        </List>
      </Gx>
    </div>
  )
}

export default HomeEntrancePage
