import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'

const Image = ({ image }) => {

  const imageArray=[image]

  return (
    <>
      <Link
        to={routes.userPage({ handle : image.user.handle })}
        className='link-that-does-not-look-like-a-link'
      >
        <p id='image-page-backlink'>&#8592; {image.user.handle}'s profile</p>
      </Link>

      <Images
        images={imageArray}
        viewStandalone={false}
      />
    </>
  )
}

export default Image
