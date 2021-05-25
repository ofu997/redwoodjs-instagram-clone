import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'

const UserPage = props => {
  return (
    <>
      <h1>User page</h1>
      <Link to={routes.images()}><p>Go back</p></Link>
      <UserCell id={props.id} />
    </>
  )
}

export default UserPage