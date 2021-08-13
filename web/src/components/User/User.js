import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'

const User = ({ infoAndImages }) => {
  const { userImages } = infoAndImages;
  const imagesToReverse = [...userImages]
  const reversedImages = imagesToReverse.reverse();
  return (
    <>
      <UserInfo user={infoAndImages} />
      <Images
        images={reversedImages}
      />
    </>
  )
}

const UserInfo = props => {
  const currentUser = getLoggedInUser();
  return (
    <>
      <div id='user-info-content'>
        <section id='user-page-profile-pic'>
          <img src={props.user.profilePicUrl} />
        </section>
        <section id='user-page-user-info'>
          <h1>{props.user.handle}</h1>
          <h1>{props.user.name}</h1>
          <h1>{props.user.bio}</h1>
          {currentUser.localStoragePassword === props.user.localStoragePassword && (
          <Link
            to={routes.editUserInfo({ handle: props.user.handle })}
            title={'Edit user ' + props.user.handle }
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit info
          </Link> )}
        </section>
      </div>
    </>
  )
}

export default User
