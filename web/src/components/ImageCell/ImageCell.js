import Image from 'src/components/Image'

export const QUERY = gql`
  query FIND_IMAGE_BY_ID($id: Int!) {
    image: image(id: $id) {
      id
      title
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Image not found</div>

export const Success = ({ image }) => {
  return <Image image={image} />
}
