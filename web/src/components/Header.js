import { Navbar, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, routes } from '@redwoodjs/router';

const Header = () => {
  const [user, setUser]=useState('');
  useEffect(() => {
    const user = localStorage.getItem('user')?
    JSON.parse(localStorage.getItem('user'))
    : []
    setUser(user);
  }, [user])

  return(
  <>
      {/* <header style={{ alignItems: 'center' }}> */}
      <Navbar className="header-custom cntr-v" bg="dark" variant='dark' expand="lg" collapseOnSelect>
        {/* <Container> */}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="cntr-v">
              <Navbar.Text>
              {user ? (
                  <Link to={ routes.userPage({id: user.id}) }><p>{user.handle}</p></Link>
                ) : <p>no user yet</p>
              }
              </Navbar.Text>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    {/* </header> */}
  </>
  )
}

export default Header