import ImagesLayout from 'src/layouts/ImagesLayout'
import ImagesCell from 'src/components/ImagesCell'
import Header from '../../components/Header/Header'

const ImagesPage = () => {

  return (
    <>
      <Header />
      <ImagesLayout>
        <ImagesCell currentUserId={currentUserId} />
      </ImagesLayout>
    </>
  )
}

const currentUserId = 1;

export default ImagesPage
