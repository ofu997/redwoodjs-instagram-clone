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
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-90w"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ maxHeight: '90vh', 
          // minWidth: '85vw', 
          // maxWidth: '95vw' 
        }}
        id='modal'
      >
        <Modal.Body >
          <Container>
            <Row
            >
              <Col md={8}
                style={{
                  // backgroundColor: 'yellow',
                }}
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
                  <div id='miniProfPic'>
                    <img src={image?.user.profilePicUrl} />
                  </div>
                )}
                  <p>{image?.user.handle}</p>
                </section>
                <section id='caption'>
                    <p className='rc-font-size'>{image?.title}</p>
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
                id='article-of-icons-and-comment-form'
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
                  <p id='created-at' className='rc-font-size'>{image?.createdAt}</p>
                  <CommentForm imageId={image?.id} userId={currentUserId} />
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
