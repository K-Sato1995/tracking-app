import React from 'react'
import { Switch, Route } from 'react-router-dom'
import About from 'components/About'
import Home from 'components/Home'
import PageNotFound from 'components/PageNotFound'
import ProjectDetail from 'components/ProjectDetail'
import UserDetail from 'components/UserDetail'
import NewProject from 'components/NewProject'
import NewLog from 'components/NewLog'
import EditProject from 'components/EditProject'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route exact path="/project/new" component={NewProject} />
      <Route exact path="/project/:id" component={ProjectDetail} />
      <Route exact path="/project/:id/new_log" component={NewLog} />
      <Route exact path="/project/:id/edit" component={EditProject} />
      <Route path="/user_info" component={UserDetail} />
      <Route path="*" exact={true} component={PageNotFound} />
    </Switch>
  )
}

export default Routes
