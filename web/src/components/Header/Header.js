import { Navbar } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Link, routes } from '@redwoodjs/router';
import {LoggedInUserContext} from 'src/components/Context/LoggedInUserContext'

const Header = () => {
  const message = useContext(LoggedInUserContext);

  useEffect(() => {
    const user = localStorage.getItem('user')?
      JSON.parse(localStorage.getItem('user'))
      : []
    setUser(user);
  }, [user])

  return(
  <>
      <Navbar className="header-custom cntr-v" bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="cntr-v">
              <Navbar.Text>
              {user ? (
                  <Link to={ routes.userPage({id: user.id}) }><p>{user.handle} {message}</p></Link>
                ) : <p>no user yet</p>
              }
              </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
  </>
  )
}

export default Header