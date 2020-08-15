import React from 'react'
import Routes from 'routes'
import Header from 'components/Header'
import styled from 'styled-components'
import { Container } from '@material-ui/core'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const MainContainer = styled(Container)`
  margin-top: 100px;
`
const App = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Routes></Routes>
      </MainContainer>
    </>
  )
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
})
