// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import UserPage from './pages/UserPage/UserPage'
import  {LoggedInUserContext}  from 'src/components/Context/LoggedInUserContext'

// import { useState } from 'react'

// const user = {};

// export const LoggedInUserContext = React.createContext();

// export const UserProvider = props => {
//   const [user, setUser] = useState({})
// }

const Routes = () => {
  // const [user, setUser] = useState({})

  return (
    <Router>
      <Set wrap={LoggedInUserContext.Provider} value={`this is context`}>
        <Route path="/user/{id:Int}" page={UserPage} name="userPage" />
        <Route path="/" page={HomePage} name='homePage' />
        <Route path="/images/new" page={NewImagePage} name="newImage" />
        <Route path="/images/{id:Int}/edit" page={EditImagePage} name="editImage" />
        <Route path="/images/{id:Int}" page={ImagePage} name="image" />
        <Route path="/images" page={ImagesPage} name="images" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
