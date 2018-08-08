import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error404 from './Error404'
import GameOfLife from './GameOfLife'
import Home from './Home'

class Routes extends React.Component<{}, {}> {
  render() {
    return <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/game-of-life" component={GameOfLife} />
      <Route component={Error404} />
    </Switch>
  }
}
export default Routes
