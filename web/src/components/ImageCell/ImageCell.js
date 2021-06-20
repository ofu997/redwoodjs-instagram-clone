import Image from 'src/components/Image'
import { getLoggedInUser } from 'src/functions/getLoggedInUser'

const user = getLoggedInUser();

export const QUERY = gql`
  query FIND_IMAGE_BY_ID($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
      likes
      comments {
        body
        user {
          id
          handle
        }
        posterId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Image not found</div>

export const Success = ({ image }) => {
  return <Image image={image} user={user} />
}
