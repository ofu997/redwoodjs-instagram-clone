import Comment from 'src/components/Comment'

export const QUERY = gql`
  query CommentsQuery{
    comments {
      id
      body
    }
  }
`

export const Loading = () => <h2 className='branding-font'>Loading...</h2>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ comments }) => {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ))
}
