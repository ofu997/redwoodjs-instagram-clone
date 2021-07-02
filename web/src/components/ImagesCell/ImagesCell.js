import Images from 'src/components/Images'

export const QUERY = gql`
  query AllImages {
    images {
      id
      title
      url
      likes
      user {
        handle
        profilePicUrl
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
        }
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
