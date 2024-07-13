import ImageCell from 'src/components/ImageCell'
import ImagesLayout from 'src/layouts/ImagesLayout'

const ImagePage = ({ id }) => {
  return (
    <ImagesLayout>
      <ImageCell id={id} />
    </ImagesLayout>
  )
}

export default ImagePage
