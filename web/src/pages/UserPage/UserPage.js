import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import Header from 'src/components/Header/Header'

const UserPage = props => {
  return (
    <>
      <Header />
      <Link to={routes.images()}><p>Go back</p></Link>
      <UserCell id={props.id} />
    </>
  )
}

export default UserPage