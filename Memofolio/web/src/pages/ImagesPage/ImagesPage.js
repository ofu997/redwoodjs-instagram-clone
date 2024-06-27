import ImagesCell from 'src/components/ImagesCell'
import ImagesLayout from 'src/layouts/ImagesLayout'

const ImagesPage = () => {
  return (
    <>
      <ImagesLayout>
        {/* if not logged in, should show a carousel or images with fewer details */}
        <ImagesCell />
        {/* <h1>header</h1> */}
      </ImagesLayout>
    </>
  )
}

export default ImagesPage
