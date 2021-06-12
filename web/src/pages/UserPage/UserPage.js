import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import Header from 'src/components/Header/Header'

const UserPage = props => {
  return (
    <>
      <Header />
      <h1>This is UserPage</h1>
      <Link to={routes.images()}><p>Go back</p></Link>
      <UserCell
        handle={props.handle}
      />
    </>
  )
}

export default UserPage
