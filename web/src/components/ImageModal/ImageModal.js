import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import { Modal } from 'react-bootstrap'
import CommentForm from 'src/components/CommentForm'

const ImageModal = props => {
  const { data, imageId, images, handleLikes, deleteClick } = props;
  const image = images.find(x => x.id === imageId)
  const currentUser = getLoggedInUser();
  const currentUserId = currentUser.id;
  const currentUserLikesThis = image?.likedBy?.some(item => item.id === currentUserId);
  const userIsValidAndOwnsImage =
    Boolean((currentUser.localStoragePassword === data?.user.localStoragePassword)
    && data?.user.images.some(x => x.id === imageId));

  return(
    <>
      <Console
      />
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <table>
        <tbody>
          <tr style={{ minHeight: '400px' }}>
            <td>{image?.id}</td>
            <td>{image?.title}</td>
            <td>
              <img src={image?.url} style={{ maxWidth: '150px' }} />
            </td>
            <td>{image?.likes}</td>
            {currentUser && (
            <td>
              {currentUserLikesThis &&
                <p>current user: {currentUser.handle} likes this</p>
              }
              {image?.likedBy && image?.likedBy.map(modalUser => {
                return <p key={modalUser.id}>user with id: {modalUser.id} likes this</p>
              })}
            </td>
            )}
            <td>
            {currentUserLikesThis ?
            <button
              onClick={() => handleLikes(image.id, "dislike") }
            >
              redHeart
            </button>
            :
            <button
              onClick={() => handleLikes(image.id, "like")}
              disabled={props.missingdata}
            >
              blankHeart
            </button>}
            </td>
            <td>
              {image?.comments &&image?.comments.map(modalComment =>
                <Comment
                  comment={modalComment}
                  user={data?.user}
                  key={modalComment.id}
                  LSuser={currentUser}
                />
              )
            }
            <CommentForm imageId={image?.id} userId={currentUserId} />
            </td>
            <td>
              <nav className="rw-table-actions">
              {userIsValidAndOwnsImage && (
                <Link
                  to={routes.editImage({ id: image?.id })}
                  title={'Edit image ' + image?.id}
                  className="rw-button rw-button-small rw-button-blue"
                >
                  Edit
                </Link>
              )}
              {(userIsValidAndOwnsImage || data?.user.isAdmin) && (
                <a
                  href="/"
                  title={'Delete image ' + image?.id}
                  className="rw-button rw-button-small rw-button-red"
                  onClick={() => deleteClick(image?.id)}
                >
                  Delete
                </a>
              )}
              </nav>
            </td>
          </tr>
        </tbody>
      </table>
      </Modal>
    </>
  )
}

const Console = props => {
  return false;
}

export default ImageModal
