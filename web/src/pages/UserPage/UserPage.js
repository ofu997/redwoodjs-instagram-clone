import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import Header from 'src/components/Header/Header'
import ImagesLayout from 'src/layouts/ImagesLayout'

const UserPage = props => {
  return (
    <ImagesLayout>
      <Header />
      <UserCell
        handle={props.handle}
      />
    </ImagesLayout>
  )
}

export default UserPage
