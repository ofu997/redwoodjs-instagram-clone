import ImagesLayout from 'src/layouts/ImagesLayout'

import UserCell from '../../components/UserCell'

const UserPage = (props) => {
  return (
    <>
      <ImagesLayout>
        <UserCell handle={props.handle} />
      </ImagesLayout>
    </>
  )
}

export default UserPage
