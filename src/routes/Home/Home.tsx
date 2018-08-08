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
          {Hello('This is the start of the app"')}
          {Hello('cp the "Home" folder  to a new route in .src/routes/ to get started"')}
          {Hello('add the route to "routes/Routes.tsx" to register it with the router')}
          {Hello('update "header/index.tsx" to add the new route to the navigation')}
        </List>
      </Gx>
    </div>
  )
}

export default HomeEntrancePage
