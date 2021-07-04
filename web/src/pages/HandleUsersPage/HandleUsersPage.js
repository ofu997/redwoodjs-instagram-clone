import { useState } from 'react'

import SignUpForm from 'src/components/SignUpForm/SignUpForm.js'
import LogInForm from 'src/components/LogInForm/LogInForm.js'

const HandleUsersPage = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showLogInForm, setShowLogInForm] = useState(true)

  const toggleSignUpLogIn = () => {
    setShowSignUpForm(!showSignUpForm)
    setShowLogInForm(!showLogInForm)
  }

  return (
    <>
      {showSignUpForm &&
        <SignUpForm
          setShowSignUpForm={setShowSignUpForm}
          setShowLogInForm={setShowLogInForm}
        />
      }
      {showLogInForm &&
        <LogInForm />
      }

      <h5
        onClick={toggleSignUpLogIn}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        {
          showLogInForm? `Don't have an account? Sign Up` : `Already have an account? Log In`
        }
      </h5>
    </>
  )
}

export default HandleUsersPage
