import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

const Image = ({ image }) => {

  const imageArray=[image]

  return (
    <>
      <MetaTags
        title={`{image.title.substring(0, 75)} | {image.user.name}`}
        ogType='website'
        ogUrl={`https://memofolio.netlify.app/memo/{image.id}`}
        ogContentUrl={image.url}
      />
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
