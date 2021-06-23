// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'
import { useState } from 'react'

const Routes = () => {
  const [userToken, setUserToken] = useState('')

  return (
    <Router>
      <Route path="/" page={ImagesPage} name="images" />
      <Route path="/u/{handle:String}/edit" page={EditUserInfoPage} name="editUserInfo" />
      <Route path="/u/{handle:String}" page={UserPage} name="userPage" />
      <Route path="/log" page={HomePage} name='homePage' />
      <Route path="/images/new" page={NewImagePage} name="newImage" />
      <Route path="/images/{id:Int}/edit" page={EditImagePage} name="editImage" />
      <Route path="/images/{id:Int}" page={ImagePage} name="image" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
