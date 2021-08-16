import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'

const Image = ({ image }) => {

  const imageArray=[image]

  return (
    <>
      <Link
        to={routes.userPage({ handle : image.user.handle })}
        class='linkThatDoesNotLookLikeALink'
      >
        <p id='image-page-backlink'>&#8592; {image.user.handle}'s profile</p>
      </Link>
      <Images
        images={imageArray}
      />
    </>
  )
}

export default Image
