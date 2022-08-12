import { Navbar, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { navigate, routes } from '@redwoodjs/router';
import { getLoggedInUser, dummyObject } from 'src/functions/WebFunctions'
import { toast } from '@redwoodjs/web/dist/toast';
import { useMutation, useQuery } from '@redwoodjs/web'
import { PersonCircle, PlusSquare } from 'react-bootstrap-icons'

const USER_QUERY = gql`
  query HeaderQuery($currentUserId: Int!) {
    userByQuery : user (id: $currentUserId) {
      localStoragePassword
    }
  }
`

const Header = () => {
  const [user, setUser] = useState({ });

  const currentUserId = getLoggedInUser().id;

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
            {
            (data && user.localStoragePassword === data.userByQuery.localStoragePassword)
            &&
              <Nav.Item className='cntr-v'>
                <Nav.Link href={routes.newImage()} className="navbarItem">
                  <div className='header-nav-items'>
                    <PlusSquare size={25} color='black' />
                  </div>
                </Nav.Link>
              </Nav.Item>
            }
              <Nav.Item className='cntr-v'>
              {user.profilePicUrl
              ? (<Nav.Link href={routes.userPage({ handle: user.handle })} className="navbarItem">
                  <div className='header-nav-items'>
                    <img src={user.profilePicUrl} className='picBorder' />
                  </div>
                </Nav.Link>)
              : (<PersonCircle size={25} color='black' className="navbarItem" />)}
              </Nav.Item>
              <Nav.Item className='cntr-v' >
                {user.id ? (
                  <Nav.Link className="navbarItem">
                    <div
                      onClick={() => logoutUser({ variables: { id: user.id } } )}
                    >
                      <p className='login-logout-text'>Log out</p>
                    </div>
                  </Nav.Link>
                ) : (
                  <Nav.Link href={routes.handleUsersPage()} className="navbarItem">
                    <p className='login-logout-text'>Log in</p>
                  </Nav.Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      {loading && <h2 className='branding-font cntr-h rw-text-center'>Logging out</h2>}
      {error && <h2 className='branding-font cntr-h rw-text-center'>{error}</h2>}
      {/* {useQueryError && <h2 className='branding-font cntr-h rw-text-center'>{useQueryError}</h2>} */}
  </>
  )
}

export default Header
