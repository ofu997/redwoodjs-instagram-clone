import EditImageCell from 'src/components/EditImageCell'
import ImagesLayout from 'src/layouts/ImagesLayout'

const EditImagePage = ({ id }) => {
  return (
    <ImagesLayout>
      <EditImageCell id={id} />
    </ImagesLayout>
  )
}

export default EditImagePage
