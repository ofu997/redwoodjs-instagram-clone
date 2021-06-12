export const QUERY = gql`
  query doesnotmatter($handle: String!) {
    editUserInfo: findUserByHandle(handle: $handle) {
      id
      name
      handle
      bio
      profilePicUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ editUserInfo }) => {
  return(
    <h1>success for {editUserInfo.handle} </h1>
  )
}
