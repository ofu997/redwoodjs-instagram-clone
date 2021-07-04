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

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Empty = () => <h2 className='branding-font'>Empty</h2>

export const Failure = ({ error }) => <h2 className='branding-font'>Error: {error.message}</h2>

export const Success = ({ images }) => {
  return <Images images={images} />
}
