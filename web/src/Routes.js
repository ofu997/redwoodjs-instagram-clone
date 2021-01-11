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
      <Route path="/images/new" page={NewImagePage} name="newImage" />
      <Route path="/images/{id:Int}/edit" page={EditImagePage} name="editImage" />
      <Route path="/images/{id:Int}" page={ImagePage} name="image" />
      <Route path="/images" page={ImagesPage} name="images" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
