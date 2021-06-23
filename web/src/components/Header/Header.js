import
{
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, navigate, routes } from '@redwoodjs/router';
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'
import { toast } from '@redwoodjs/web/dist/toast';
import { useMutation } from '@redwoodjs/web'

const Header = () => {
  const [user, setUser] = useState({ });

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
    setUser(localStorageUser);
  }, [])

  const LOG_OUT_MUTATION = gql`
    mutation LogOutMutation($id: Int!) {
      logoutUser(id: $id) {
        id
      }
    }
  `

  const [logoutUser, { loading, error }] = useMutation(LOG_OUT_MUTATION, {
    onCompleted: () => {
      toast.success('Logged out', { classes: 'rw-flash-success' }),

      localStorage.removeItem('user'),
      // setTimeout(() => {
        navigate(routes.images())
      // }, 200)
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
              <Nav.Item
              >
                {/* <Nav.Link className="navbarItem "> */}
                {user.id && (
                    <Link className="navbarItem" to={ routes.userPage({ handle: user.handle }) }><p style={{ margin: '0 auto' }}>Profile</p></Link>
                  )
                }
                {/* </Nav.Link> */}
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="navbarItem">
                  {user.id && (
                    <div
                      onClick={() => logoutUser({ variables: { id: user.id } } )}
                    >
                      <p style={{ color: '#0d6efd' }}>Log out</p>
                    </div>
                  )}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  </>
  )
}

export default Header
