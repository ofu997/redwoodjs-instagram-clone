import Images from 'src/components/Images'

export const QUERY = gql`
  query AllImages {
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

export const Success = ({ images }) => {
  return <Images images={images} />
}
