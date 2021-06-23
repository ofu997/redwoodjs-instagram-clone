import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import CommentForm from 'src/components/CommentForm'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/ImagesCell'
// import { QUERY } from 'src/components/ImageCell'
import Comment from 'src/components/Comment/Comment'

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Image = ({ image, user }) => {
  const [deleteImage] = useMutation(DELETE_IMAGE_MUTATION, {
    onCompleted: () => {
      navigate(routes.images())
      toast.success('Image deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete image ' + id + '?')) {
      deleteImage({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Image {image.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{image.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{image.title}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{image.url}</td>
            </tr>
            <tr>
              <th>Likes</th>
              <td>{image.likes}</td>
            </tr>
            <tr>
              <th>Comments</th>
              <td>
              {image.comments.map(comment => {
                return(
                  <Comment comment={comment} />
                )
              })}
              </td>
            </tr>
          </tbody>
        </table>
        <CommentForm imageId={image.id} userId={user.id} />
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editImage({ id: image.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(image.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Image
