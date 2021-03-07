import { useState } from 'react'

import SignUpForm from 'src/components/SignUpForm/SignUpForm.js'
import SignInForm from 'src/components/SignInForm/SignInForm.js'

const HomePage = () => {
  const [showSignUp, setShowSignUp] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)

  const toggleSignUpSignIn = () => {
    setShowSignUp(!showSignUp)
    setShowSignIn(!showSignIn)
    console.log(showSignUp)
  }

  return (
    <>
      <h2
        onClick={toggleSignUpSignIn}
      >
        {
          showSignUp? `Sign Up` : `Sign In`
        }
      </h2>
      {/* <h1>Login</h1> */}

      {showSignUp &&
        <SignUpForm />
      }
      {showSignIn &&
        <SignInForm />
      }
    </>
  )
}

export default HomePage
