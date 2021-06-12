import { Link, routes } from '@redwoodjs/router'

import Images from 'src/components/Images'

export const QUERY = gql`
  query CurrentUserAndAllImages($currentUserId: Int!) {
    user (id: $currentUserId) {
      id
      handle
      userLikes {
        id
        title
      }
      images {
        title
        url
        likes
        userId
      }
    }

    images {
      id
      title
      url
      likes
      comments {
        body
      }
      likedBy {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No images yet. '}
      <Link to={routes.newImage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ images, user }) => {
  return <Images images={images} user={user} />
}
