import { useMutation, useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import Comment from 'src/components/Comment'
import { QUERY } from 'src/components/ImagesCell'
import { toast } from '@redwoodjs/web/toast'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import jwt_decode from "jwt-decode";
var jwt = require('jsonwebtoken')
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import CommentForm from 'src/components/CommentForm'

const ImageModal = props => {
  const { data, image, handleLikes, deleteClick, setActiveItem, setModalShow } = props;
  const obj = { data, image }
  const currentUser = getLoggedInUser();
  const currentUserId = currentUser.id;
  const currentUserLikesThis = image?.likedBy?.some(item => item.id === currentUserId);
  const truncate = (text) => {
    let output = text
    if (text && text.length >150) {
      output = output.substring(0, 150) + '...'
    }
    return output
  }

  const triggerRefresh = () => {
    setRefresh(!refresh);
  }

  const forceUpdateHandler = () => {
    forceUpdate();
  }

  return(
    <>
      <Console obj={obj} />
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <table>
        <tbody>
          <tr style={{ minHeight: '400px' }}>
            <td>{truncate(image?.id)}</td>
            <td>{truncate(image?.title)}</td>
            <td>
              <img src={image?.url} style={{ maxWidth: '150px' }} />
            </td>
            <td>{truncate(image?.likes)}</td>
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
              onClick={() => { handleLikes(image?.id, "dislike"); setModalShow(false); setTimeout(()=>{setActiveItem(image)}, 1000), setTimeout(()=>{setModalShow(true)}, 1000) }}
            >
              redHeart
            </button>
            :
            <button
              onClick={() => { handleLikes(image?.id, "like"); setActiveItem(image) }}
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
            <CommentForm imageId={image.id} userId={currentUserId} />
            </td>
            <td>
              <nav className="rw-table-actions">
                <Link
                  to={routes.editImage({ id: image?.id })}
                  title={'Edit image ' + image?.id}
                  className="rw-button rw-button-small rw-button-blue"
                >
                  Edit
                </Link>
                <a
                  href="/"
                  title={'Delete image ' + image?.id}
                  className="rw-button rw-button-small rw-button-red"
                  onClick={() => deleteClick(image?.id)}
                >
                  Delete
                </a>
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
  console.log('obj according to modal: ')
  console.table(props.obj)
  return false;
}

export default ImageModal
