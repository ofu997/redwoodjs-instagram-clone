import ImagesLayout from 'src/layouts/ImagesLayout'
import ImagesCell from 'src/components/ImagesCell'
import Header from '../../components/Header/Header'
import { useState, useEffect } from 'react';
import { getLoggedInUser } from 'src/functions/GetLoggedInUser'

const ImagesPage = () => {
  const [user, setUser] = useState({ });

  useEffect(() => {
    const localStorageUser = getLoggedInUser();
    setUser(localStorageUser);
  }, [])

  return (
    <>
      <Header />
      <ImagesLayout>
        {/* if not logged in, should show a carousel or images with fewer details */}
        {
          <ImagesCell currentUserId={user.id} />
        }
      </ImagesLayout>
    </>
  )
}

export default ImagesPage