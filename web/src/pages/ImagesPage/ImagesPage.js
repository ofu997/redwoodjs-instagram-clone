import ImagesLayout from 'src/layouts/ImagesLayout'
import ImagesCell from 'src/components/ImagesCell'

const ImagesPage = () => {
  return (
    <>
      <ImagesLayout>
        {/* if not logged in, should show a carousel or images with fewer details */}
          <ImagesCell />
      </ImagesLayout>
    </>
  )
}

export default ImagesPage
