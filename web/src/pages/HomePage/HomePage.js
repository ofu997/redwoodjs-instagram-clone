import { useState } from 'react'

import SignUpForm from 'src/components/SignUpForm/SignUpForm.js'
import LogInForm from 'src/components/LogInForm/LogInForm.js'

const HomePage = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showLogInForm, setShowLogInForm] = useState(true)

  const toggleSignUpLogIn = () => {
    setShowSignUpForm(!showSignUpForm)
    setShowLogInForm(!showLogInForm)
  }

  return (
    <>
      {showSignUpForm &&
        <SignUpForm />
      }
      {showLogInForm &&
        <LogInForm />
      }

      <h4
        onClick={toggleSignUpLogIn}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        {
          showLogInForm? `Don't have an account? Sign Up` : `Already have an account? Log In`
        }
      </h4>
    </>
  )
}

export default HomePage
