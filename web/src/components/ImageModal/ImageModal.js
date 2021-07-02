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
        style={{ minHeight: '75vh', maxHeight: '90vh', minWidth: '75vw', maxWidth: '90vw' }}
      >
        <Modal.Body >
          <Container style={{ height: 800 }}>
            <Row >
              <Col md={8} sm={7} xs={6}
                style={{
                  backgroundColor: 'yellow',
                  // position: 'fixed'
                  // overflowY: ''
                }}
              >
                <img src={image?.url} style={{ objectFit: 'contain' }} />
              </Col>
              <Col md={4} sm={5} xs={6}
                // id='image-modal-right-column'
                className='d-flex'
              >
              <article
              style={{ alignSelf: 'flex-start' }}
              >
                <section id='miniProfPicAndHandle'>
                {image?.user.profilePicUrl && (
                  <div id='miniProfPic'>
                    <img src={image?.user.profilePicUrl} />
                  </div>
                )}
                  <p>{image?.user.handle}</p>
                </section>
                <section id='caption'>
                  <div>
                    <p>{image?.title}</p>
                  </div>
                </section>
                <section id='comments-box'>
                {image?.comments &&image?.comments.map(modalComment =>
                  <Comment
                    comment={modalComment}
                    user={data?.user}
                    key={modalComment.id}
                    LSuser={currentUser}
                  />
                )}
                </section>
              </article>
              <article
              style={{ alignSelf: 'flex-end' }}
              >
                <section id="icons-and-comment-form">
                  <div className='flex'>
                    <div className='block like-and-comment-icons'>
                      {currentUserLikesThis ?
                      <button
                        onClick={() => handleLikes(image.id, "dislike") }
                      >
                        <img src="https://img.icons8.com/color/20/000000/like--v3.png"/>
                      </button>
                      :
                      <button
                        onClick={() => handleLikes(image.id, "like")}
                        disabled={props.missingData}
                      >
                        <img src="https://img.icons8.com/ios/20/000000/like--v1.png"/>
                      </button>}
                      <p>{image?.likes} likes</p>
                    </div>
                    <div className='block like-and-comment-icons'>
                      <img src="https://img.icons8.com/ios/20/000000/speech-bubble--v1.png" className='comment-icon' />
                      <p>{image?.comments.length}</p>
                    </div>
                  </div>
                  <CommentForm imageId={image?.id} userId={currentUserId} />
                </section>
              </article>
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
