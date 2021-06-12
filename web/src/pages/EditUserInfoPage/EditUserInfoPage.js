import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import ImagesLayout from 'src/layouts/ImagesLayout'
import EditUserInfoCell from 'src/components/EditUserInfoCell'


const EditUserInfoPage = props => {
  return (
    <>
      <ImagesLayout>
        <EditUserInfoCell handle={props.handle} />
      </ImagesLayout>
    </>
  )
}

export default EditUserInfoPage
