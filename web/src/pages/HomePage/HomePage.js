import { useState } from 'react'

import SignUpForm from 'src/components/SignUpForm/SignUpForm.js'
import LogInForm from 'src/components/LogInForm/LogInForm.js'

const HomePage = () => {
  const [showSignUp, setShowSignUp] = useState(true)
  const [showLogIn, setShowLogIn] = useState(false)

  const toggleSignUpLogIn = () => {
    setShowSignUp(!showSignUp)
    setShowLogIn(!showLogIn)
    console.log(showSignUp)
  }

  return (
    <>
      <h2
        onClick={toggleSignUpLogIn}
      >
        {
          showSignUp? `Log In` : `Sign Up`
        }
      </h2>
      {/* <h1>Login</h1> */}

      {showSignUp &&
        <SignUpForm />
      }
      {showLogIn &&
        <LogInForm />
      }
    </>
  )
}

export default HomePage
