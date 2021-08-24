import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { getLoggedInUser } from 'src/functions/WebFunctions'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import CommentForm from 'src/components/CommentForm'
import { Heart, HeartFill, Chat, PencilSquare, Trash } from 'react-bootstrap-icons'

const ImageModal = props => {
  const { data, imageId, images, missingData, handleLikes, deleteClick, viewStandalone } = props;
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
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-90w"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ maxHeight: '90vh',
        }}
        id='modal'
      >
        <Modal.Body >
          <Container>
            <Row
            >
              <Col md={8}
                id='left-column'
              >
                <div id='modal-image-container'>
                  <img src={image?.url} id='modal-image' style={{ objectFit: 'contain' }} />
                </div>
              </Col>
              <Col md={4}
                id='right-column'
              >
                <article
                >
                  <section id='miniProfPicAndHandle'>
                  {image?.user.profilePicUrl && (
                      <img src={image?.user.profilePicUrl} />
                  )}
                  <Link
                    to={routes.userPage({ handle : image?.user.handle })}
                    class='link-that-does-not-look-like-a-link'
                  >
                    <p style={{ fontWeight: 500 }}>{image?.user.handle}</p>
                  </Link>
                  </section>
                  {image?.title && (
                    <section id='caption'>
                      <p className='rc-font-size' style={{ marginTop : 10 }}>{image?.title}</p>
                    </section>
                  )}
                  <section id='comments-box'>
                  {image?.comments && image?.comments.map(modalComment =>
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
                  id='article-of-icons-and-comment-form'
                >
                  <section id="icons-and-comment-form">
                    <div className='flex'>
                      <div className='block like-and-comment-icons'>
                        {currentUserLikesThis ?
                        <button
                          onClick={() => handleLikes(image.id, "dislike") }
                        >
                          <HeartFill size={20} color="red" />
                        </button>
                        :
                        <button
                          onClick={() => handleLikes(image.id, "like")}
                          disabled={missingData}
                        >
                          <Heart size={20} />
                        </button>}
                        <p>{image?.likes} likes</p>
                      </div>
                      <div className='block like-and-comment-icons'>
                        <Chat size={20} />
                        <p>{image?.comments.length}</p>
                      </div>
                    </div>
                    <p id='created-at' className='rc-font-size'>{image?.createdAt}</p>
                    <CommentForm
                      imageId={image?.id}
                      userId={currentUserId}
                      user={data?.user}
                    />
                    <div className='flex' style={{ alignItems: 'center' }}>
                      {(viewStandalone != false) && (
                      <Link
                        to={routes.image({ id: image?.id })}
                        className="link-that-does-not-look-like-a-link action-links"
                      >
                        View standalone
                      </Link>
                      )}
                      {userIsValidAndOwnsImage && (
                      <Link
                        to={routes.editImage({ id: image?.id })}
                        title={'Edit image ' + image?.id}
                        className="link-that-does-not-look-like-a-link"
                      >
                        <PencilSquare size={20} style={{ margin: 10 }} />
                      </Link>
                      )}
                      {(userIsValidAndOwnsImage || data?.user.isAdmin) && (
                      <a
                        href="/"
                        title={'Delete image ' + image?.id}
                        className="link-that-does-not-look-like-a-link"
                        onClick={() => deleteClick(image?.id)}
                      >
                        <Trash size={20} style={{ margin: 10 }} />
                      </a>
                      )}
                    </div>
                  </section>
                </article>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

const Console = props => {
  return false;
}

export default ImageModal
