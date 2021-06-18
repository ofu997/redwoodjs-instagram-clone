import ImagesList from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'

const User = ({ infoAndImages }) => {
  const { userImages } = infoAndImages;
  return (
    <>
      <UserInfo user={infoAndImages} />
      <ImagesList
        // user={infoAndImages}
        images={userImages}
      />
    </>
  )
}

const UserInfo = props => {

  return (
    <>
      {/* <p>{props.profilePicUrl}</p> */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', minHeight: '100px', maxHeight: '20%', backgroundColor: '#F5F5F5' }}>
        <section
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          <img
            src={props.user.profilePicUrl}
            style={{
              borderRadius: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </section>
        <section style={{ width: '50%' }}>
          <h1 style={{ textAlign: 'center' }}>{props.user.handle}</h1>
          <h1 style={{ textAlign: 'center' }}>{props.user.name}</h1>
          <h1 style={{ textAlign: 'center' }}>{props.user.bio}</h1>
          <Link
            to={routes.editUserInfo({ handle: props.user.handle })}
            title={'Edit user ' + props.user.handle }
            className="rw-button rw-button-small rw-button-blue"
            style={{
              width: '25%',
              margin: '0 auto'
            }}
          >
            Edit info
          </Link>
        </section>
        {/* <img src="https://cdn.onebauer.media/one/empire-tmdb/films/522/images/6zSU6K7q4zntC8vgrvpoUM66eQl.jpg?format=jpg&quality=80&width=960&height=540&ratio=16-9&resize=aspectfill" /> */}

        {/* <h1>hello from userinfo</h1> */}

      </div>
    </>
  )
}


export default User
