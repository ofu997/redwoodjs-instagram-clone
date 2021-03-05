import { Link, routes } from '@redwoodjs/router'

import Images from 'src/components/Images'

export const QUERY = gql`
  query ($currentUserId: Int!) {
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
    user (id: $currentUserId) {
      id
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
