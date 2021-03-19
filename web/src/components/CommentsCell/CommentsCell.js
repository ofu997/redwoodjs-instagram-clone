import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery($imageId: Int!) {
    comment(id: $imageId) {
      id
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ comments }) => {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ))
}
