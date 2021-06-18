import ImagesLayout from 'src/layouts/ImagesLayout'
import ImagesCell from 'src/components/ImagesCell'
import Header from '../../components/Header/Header'

const ImagesPage = () => {
  return (
    <>
      <Header />
      <ImagesLayout>
        {/* if not logged in, should show a carousel or images with fewer details */}
          <ImagesCell />
      </ImagesLayout>
    </>
  )
}

export default ImagesPage
