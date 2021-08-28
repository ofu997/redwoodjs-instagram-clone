import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { navigate, routes } from '@redwoodjs/router';
import { getLoggedInUser, currentUserId, dummyObject } from 'src/functions/WebFunctions'
import { toast } from '@redwoodjs/web/dist/toast';
import { useMutation, useQuery } from '@redwoodjs/web'
import { PersonCircle, PlusSquare } from 'react-bootstrap-icons'

const USER_QUERY = gql`
  query GetUserProfilePicUrlById($currentUserId: Int!) {
    user (id: $currentUserId) {
      profilePicUrl
    }
  }
`

const Header = () => {
  const [user, setUser] = useState({ });

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
    setUser(localStorageUser);
  }, [])

  const { error:useQueryError, data } = currentUserId ?
    useQuery(USER_QUERY, {
      variables: { currentUserId }
    })
    :
    dummyObject;

  const LOG_OUT_MUTATION = gql`
    mutation LogOutMutation($id: Int!) {
      logoutUser(id: $id) {
        id
      }
    }
  `

  const [logoutUser, { loading, error }] = useMutation(LOG_OUT_MUTATION, {
    onCompleted: () => {
      toast.success('Logged out', { classes: 'rw-flash-success' })

      localStorage.removeItem('user');
      setTimeout(() => {
        navigate(routes.handleUsersPage())
        // navigate(routes.images()) prefer this route slightly, but has errors
      }, 200)
    },
    onError: (e) => {
      console.log(e)
    },
    ignoreResults: false,
  })

  return(
  <>
      <Navbar className="header-custom" bg="light" variant='light' expand="md" collapseOnSelect
      >
        <Navbar.Brand href="/"><h1 className='branding-font'>Memofolio</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"
          className="justify-content-end"
          >
            <Nav
              className="justify-content-end"
              activeKey='/'
            >
              <Nav.Item>
                <Nav.Link href={routes.newImage()} className="navbarItem">
                {user.id && (
                  <PlusSquare size={20} color='black' />
                )}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={routes.userPage({ handle: user.handle })} className="navbarItem">
                {data?.user.profilePicUrl
                  ? (<div className='header-profile-pic'>
                      <img src={data.user.profilePicUrl} className='picBorder' />
                    </div>)
                  : user.profilePicUrl
                    ? (<div className='header-profile-pic'>
                        <img src={user.profilePicUrl} className='picBorder' />
                      </div>)
                    : (<PersonCircle size={20} color='black' />)
                }
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {user.id ? (
                  <Nav.Link className="navbarItem">
                    <div
                      onClick={() => logoutUser({ variables: { id: user.id } } )}
                    >
                      <p style={{ textAlign: 'left' }}>Log out</p>
                    </div>
                  </Nav.Link>
                ) : (
                  <Nav.Link href={routes.handleUsersPage()} className="navbarItem">
                    <p style={{ textAlign: 'left' }}>Log in</p>
                  </Nav.Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  </>
  )
}

export default Header
