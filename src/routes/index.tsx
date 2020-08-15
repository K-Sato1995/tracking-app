import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from 'components/About'
import Home from 'components/Home'
import PageNotFound from 'components/PageNotFound'
import ProjectDetail from 'components/ProjectDetail'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route path="*" exact={true} component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
