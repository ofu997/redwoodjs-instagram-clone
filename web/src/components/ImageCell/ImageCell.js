import Image from 'src/components/Image'
import { getLoggedInUser } from 'src/functions/WebFunctions'

const user = getLoggedInUser();

export const QUERY = gql`
  query FindImageByCellImageCell($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      likes

      user {
        handle
        profilePicUrl
        name
      }

      userId
      createdAt

      comments {
        id
        body
        imageId
        user {
          id
          handle
          jwt
        }
        posterId
      }

      likedBy {
          id
      }
    }
  }
`

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Empty = () => <div>Image not found</div>

export const Success = ({ image }) => {
  return <Image image={image} user={user} />
}
