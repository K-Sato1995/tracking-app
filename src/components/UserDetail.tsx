import React from 'react'
import { useApi } from 'hooks/useApi'
import { Redirect } from 'react-router-dom'

const UserDetail = () => {
  const { loading, error, data: user } = useApi(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
  )

  if (loading) return <div>Loading...</div>

  if (error) return <Redirect to="404" />

  const { userName } = user

  return (
    <div>
      <h1>User Page</h1>
      <ul>
        <li>name: {userName}</li>
        <li>email: {user.email}</li>
      </ul>
    </div>
  )
}

export default UserDetail
