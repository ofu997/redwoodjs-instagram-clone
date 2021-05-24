import { Link, routes } from '@redwoodjs/router'

const USER_IMAGES = gql`
  query ($id: Int!) {
    user(id: $id) {
      images {
        id
        title
        url
        likes

        comments

        likedBy

        user

        userId
      }
    }
  }
`



const User = ({ user }) => {
  const { images } = user;
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead style={{ border: '5px solid black' }}>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th style={{ width: 150 }}></th>
            {/* <th>Url</th> */}
            <th>Likes</th>
            <th>Which users like this</th>
            <th style={{ width: 150 }}></th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td>{truncate(image.id)}</td>
              <td>{truncate(image.title)}</td>
              <td>
                <a href={image.url} target="_blank">
                  <img src={image.url} style={{ maxWidth: '150px' }} />
                </a>
              </td>
              {/* <td>{truncate(image.url)}</td> */}
              <td>{truncate(image.likes)}</td>
              <td>{/*logic for displaying if user likes this. use useQuery from Apollo */}
                {image.likedBy.some(item => item.id === currentUserId) &&
                  <p>current user: {user.handle} likes this</p>
                }
                {image.likedBy.map(item => {
                  return <p>user with id: {item.id} likes this</p>
                })}
              </td>
              <td>
                <button
                  // onClick={() => incrementLikes(image.id, image.likes)}
                  onClick={() => incrementLikes(image.id, currentUserId)}
                >
                  like
              </button>
              </td>
              <td>
                <CommentsCell imageId={image.id} />
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.image({ id: image.id })}
                    title={'Show image ' + image.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                </Link>
                  <Link
                    to={routes.editImage({ id: image.id })}
                    title={'Edit image ' + image.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                </Link>
                  <a
                    href="#"
                    title={'Delete image ' + image.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(image.id)}
                  >
                    Delete
                </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User