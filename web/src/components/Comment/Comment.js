import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const Comment = props => {
  const [deleteComment, { loading, error }] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () =>
    {},
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const handleDelete = id => {
    deleteComment({variables: {id} })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>{props.comment.id} {props.comment.user.handle}: {props.comment.body}</p>
      <div
        onClick={() => handleDelete(props.comment.id)}
        style={{ padding: '2px', border: '1px solid red', marginLeft: '20px' }}
      >
        delete
      </div>
      {/* add a deleteComment function here */}
    </div>
  )
}

export default Comment
