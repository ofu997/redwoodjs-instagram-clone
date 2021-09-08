import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'
import { getLoggedInUser } from 'src/functions/WebFunctions'
import { Head } from '@redwoodjs/web'

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
      <Head>
        <title>{props.user.name} | Memofolio</title>
      </Head>
      <div id='user-info-container'>
        <section id='user-page-profile-pic'>
          <img src={props.user.profilePicUrl} />
        </section>
        <section id='user-page-user-info'>
          <div id='user-info-handle-editLink'>
            <h4>{props.user.handle}</h4>
            {currentUser.localStoragePassword === props.user.localStoragePassword && (
            <Link
              to={routes.editUserInfo({ handle: props.user.handle })}
              title={'Edit user ' + props.user.handle }
              className="link-that-does-not-look-like-a-link"
              id='edit-info-link'
            >
              <h4>Edit info</h4>
            </Link> )}
          </div>
          <p className='user-bio'><strong>{props.user.userImages.length}</strong>  {props.user.userImages.length == 1 ? `memo`:`memos`}</p>
          <h4>{props.user.name}</h4>
          <p className='user-bio'>{props.user.bio}</p>
        </section>
      </div>
    </>
  )
}

export default User
