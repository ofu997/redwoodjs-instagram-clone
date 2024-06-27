import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import ImagesLayout from 'src/layouts/ImagesLayout'

const UserPage = props => {
  return (
    <>
      <ImagesLayout>
        <UserCell
          handle={props.handle}
        />
      </ImagesLayout>
    </>
  )
}

export default UserPage
