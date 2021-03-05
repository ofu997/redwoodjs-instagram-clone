import ImagesLayout from 'src/layouts/ImagesLayout'
import ImagesCell from 'src/components/ImagesCell'

const ImagesPage = () => {
  return (
    <ImagesLayout>
      <ImagesCell currentUserId={currentUserId} />
    </ImagesLayout>
  )
}

const currentUserId = 1;

export default ImagesPage
