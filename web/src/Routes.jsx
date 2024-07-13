// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={ImagesPage} name="images" />
      <Route path="/u/{handle:String}/edit" page={EditUserInfoPage} name="editUserInfo" />
      <Route path="/u/{handle:String}" page={UserPage} name="userPage" />
      <Route path="/login" page={HandleUsersPage} name="handleUsersPage" />
      <Route path="/add-memo" page={NewImagePage} name="newImage" />
      <Route path="/memo/{id:Int}/edit" page={EditImagePage} name="editImage" />
      <Route path="/memo/{id:Int}" page={ImagePage} name="image" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
