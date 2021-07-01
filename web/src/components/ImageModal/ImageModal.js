import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import CommentForm from 'src/components/CommentForm'

const ImageModal = props => {
  const { data, imageId, images, missingData, handleLikes, deleteClick } = props;
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
        // {...props}. Only need show and onHide
        show={props.show}
        onHide={props.onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // scrollable={true}
      >
        <Modal.Body >
          <Container style={{ maxHeight: '60vh' }}>
            <Row >
              <Col md={9} sm={8} xs={6}
                style={{
                  backgroundColor: 'yellow',
                  // position: 'fixed'
                  // overflowY: ''
                }}
              >
                <img src={image?.url} style={{ objectFit: 'contain' }} />
              </Col>
              <Col md={3} sm={4} xs={6}
              >
              <section id='captionAndComments' style={{
                maxHeight: '40vh',
                overflowY: 'auto'
                }}
              >
                <p>{image?.title}</p>
                {image?.comments &&image?.comments.map(modalComment =>
                  <Comment
                    comment={modalComment}
                    user={data?.user}
                    key={modalComment.id}
                    LSuser={currentUser}
                  />
                )}
              </section>
              <section id="likesAndCommentForm" style={{
                // display: 'flex',
                maxHeight: '15vh'
                }}
              >
                {currentUserLikesThis ?
                <button
                  onClick={() => handleLikes(image.id, "dislike") }
                >
                  redHeart
                </button>
                :
                <button
                  onClick={() => handleLikes(image.id, "like")}
                  disabled={props.missingData}
                >
                  blankHeart
                </button>}
                <p>{image?.likes} likes</p>
                {/* <p>{image?.comments.length}</p> */}
                <CommentForm imageId={image?.id} userId={currentUserId} />
              </section>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      {/* <table>
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
              disabled={props.missingData}
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
      </table> */}
      </Modal>
    </>
  )
}

const Console = props => {
  return false;
}

export default ImageModal
