import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import { useContext } from 'react'
 import {LoggedInUserContext} from 'src/Routes'

const UserPage = props => {
  const [user, setUser] = useContext(LoggedInUserContext)

  return (
    <>
      <h1>User page</h1>
      <Link to={routes.images()}><p>Go back</p></Link>
      <UserCell id={props.id} />
    </>
  )
}

export default UserPage
