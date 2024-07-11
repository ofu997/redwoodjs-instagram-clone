import EditUserInfoCell from 'src/components/EditUserInfoCell'
import ImagesLayout from 'src/layouts/ImagesLayout'

const EditUserInfoPage = (props) => {
  return (
    <>
      <ImagesLayout>
        <EditUserInfoCell handle={props.handle} />
      </ImagesLayout>
    </>
  )
}

export default EditUserInfoPage
