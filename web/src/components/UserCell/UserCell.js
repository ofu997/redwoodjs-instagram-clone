import User from 'src/components/User/User'

export const QUERY = gql`
  query UserQuery($handle: String!) {
    userInfoAndImages: findUserByHandle(handle: $handle) {
      name
      handle
      profilePicUrl
      bio
      jwt

      userImages : images {
        id
        title
        url
        likes
        comments {
          body
          user {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ userInfoAndImages }) => {
  return <User infoAndImages={userInfoAndImages} />
}
