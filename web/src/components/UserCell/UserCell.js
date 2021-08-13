import User from 'src/components/User/User'

export const QUERY = gql`
  query UserQuery($handle: String!) {
    userInfoAndImages: findUserByHandle(handle: $handle) {
      name
      handle
      profilePicUrl
      bio
      jwt
      localStoragePassword

      userImages : images {
        id
        title
        url
        likes
        createdAt
        user {
          handle
          profilePicUrl
        }
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
          handle
        }
      }

    }
  }
`

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Empty = () => <h2 className='branding-font'div>No memos</h2>

export const Failure = ({ error }) => <h2 className='branding-font'div>Error: {error.message}</h2>

export const Success = ({ userInfoAndImages }) => {
  return <User infoAndImages={userInfoAndImages} />
}
