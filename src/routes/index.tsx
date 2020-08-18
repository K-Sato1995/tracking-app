import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from 'components/About'
import Home from 'components/Home'
import PageNotFound from 'components/PageNotFound'
import ProjectDetail from 'components/ProjectDetail'
import UserDetail from 'components/UserDetail'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/user_info" component={UserDetail} />
      <Route path="*" exact={true} component={PageNotFound} />
    </Switch>
  )
}

export default Routes
