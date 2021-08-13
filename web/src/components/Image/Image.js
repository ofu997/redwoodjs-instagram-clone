import Images from 'src/components/Images/Images'

const Image = ({ image }) => {

  const imageArray=[image]

  return (
    <>
      <Images
        images={imageArray}
      />
    </>
  )
}

export default Image
