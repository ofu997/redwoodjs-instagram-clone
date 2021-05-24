import User from 'src/components/User'

export const QUERY = gql`
  query UserQuery($id: Int!) {
    user: user(id: $id) {
      id
      images {
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
          handle
        }

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
