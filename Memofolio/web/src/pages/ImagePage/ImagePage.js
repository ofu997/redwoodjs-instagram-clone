import ImagesLayout from 'src/layouts/ImagesLayout'
import ImageCell from 'src/components/ImageCell'

const ImagePage = ({ id }) => {
  return (
    <ImagesLayout>
      <ImageCell
        id={id}
      />
    </ImagesLayout>
  )
}

export default ImagePage
