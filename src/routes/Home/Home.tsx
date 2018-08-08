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
          {Hello('Click "Life" to get Started"')}
        </List>
      </Gx>
    </div>
  )
}

export default HomeEntrancePage
