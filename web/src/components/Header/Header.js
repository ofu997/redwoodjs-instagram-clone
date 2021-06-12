import { Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, routes } from '@redwoodjs/router';
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'

const Header = () => {
  const [user, setUser] = useState({ });

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
    setUser(localStorageUser);
  }, [])

  return(
  <>
      <Navbar className="header-custom cntr-v" bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="cntr-v">
              <Navbar.Text>
              {user ? (
                  <Link to={ routes.userPage({ handle: user.handle }) }><p>{user.handle}</p></Link>
                )
                : <p>no user yet</p>
              }
              </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
  </>
  )
}

export default Header