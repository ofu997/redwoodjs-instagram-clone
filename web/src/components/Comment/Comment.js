import { useMutation } from '@redwoodjs/web'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import jwt from 'jsonwebtoken'

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
    // isAdmin
    (
      ( props.comment.user.id === props.LSuser.id && props.LSuser.localStoragePassword === props.user.localStoragePassword )
      ||
      props.user.images.some(image => image.id === props.comment.imageId)
      ||
      ( props.user.isAdmin && props.LSuser.localStoragePassword === props.user.localStoragePassword )
    ) ?
      jwt.verify(props.user.jwt, 'my-secret-from-env-file-in-prod', function(err) {
        if (err) {
          toast.error('Please log in again')
        }
        else {
          deleteComment({variables: {id} })
        }
      })
    :
    toast.error("Invalid credentials!")
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
      <p className='rc-font-size'>{props.comment.user.handle}: {props.comment.body}</p>
      {(
        ( props.comment.user.id === props.LSuser.id && props.LSuser.localStoragePassword === props.user?.localStoragePassword )
        ||
        props.user?.images.some(image => image.id === props.comment.imageId)
        ||
        ( props.user?.isAdmin && props.LSuser.localStoragePassword === props.user?.localStoragePassword )
      ) && (
        <div
          onClick={() => missingData? (
            toast.error("Must be logged in to delete comment")
          )
          : handleDelete(props.comment.id)}
          id='comment-x-box'
        >
        </div>
      )}
    </div>
  )
}

Comment.defaultProps = {
  user: null
}

export default Comment
