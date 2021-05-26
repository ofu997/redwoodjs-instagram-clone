import ImagesList from'src/components/Images/Images'

const User = ({ infoAndImages }) => {
  const { userImages } = infoAndImages;
  return <ImagesList user={infoAndImages} images={userImages} />
}

export default User