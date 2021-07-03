import NewImageLayout from 'src/layouts/NewImageLayout'
import EditImageCell from 'src/components/EditImageCell'

const EditImagePage = ({ id }) => {
  return (
    <NewImageLayout>
      <EditImageCell
        id={id}
      />
    </NewImageLayout>
  )
}

export default EditImagePage
