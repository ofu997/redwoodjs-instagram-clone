import { Link, routes } from '@redwoodjs/router'
import UserCell from '../../components/UserCell'
import Header from 'src/components/Header/Header'
import { useState, useEffect } from 'react';
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'

const UserPage = () => {
  const [user, setUser] = useState({ });

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
      setUser(localStorageUser);
    }, [])

  return (
    <>
      <Header />
      <Link to={routes.images()}><p>Go back</p></Link>
      <UserCell id={user.id} />
    </>
  )
}

export default UserPage