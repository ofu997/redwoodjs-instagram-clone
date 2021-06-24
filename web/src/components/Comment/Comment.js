import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'

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

  const missingData = !props.user ? true : false;

  const handleDelete = id => {
    // comment posterId = userId (check LS and uQ match)
    // image belongs to user
    (
      ( props.comment.user.id === props.LSuser.id && props.LSuser.localStoragePassword === props.user.localStoragePassword )
      ||
      props.user.images.some(image => image.id === props.comment.imageId)
    ) ?
      deleteComment({variables: {id} })
      :
      toast.error("Invalid credentials!")
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>{props.comment.id} {props.comment.user.handle}: {props.comment.body}</p>
      <div
        onClick={() => missingData? (
          toast.error("Must be logged in to delete comment")
        )
        : handleDelete(props.comment.id)}
        style={{ padding: '2px', border: '1px solid red', marginLeft: '20px' }}
      >
        delete
      </div>
    </div>
  )
}

Comment.defaultProps = {
  user: null
}

export default Comment
