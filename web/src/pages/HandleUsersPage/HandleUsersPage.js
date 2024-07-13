import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'

import LogForm from 'src/components/LogForm'
import SignUpForm from 'src/components/SignUpForm'

const HandleUsersPage = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showLogInForm, setShowLogInForm] = useState(true)

  const toggleSignUpLogIn = () => {
    setShowSignUpForm(!showSignUpForm)
    setShowLogInForm(!showLogInForm)
  }

  return (
    <>
      <Link
        to={routes.images()}
        className="link-that-does-not-look-like-a-link"
      >
        <h4 style={{ margin: '5rem 0rem 0rem 5rem' }}>Home</h4>
      </Link>
      {showSignUpForm && (
        <SignUpForm
          setShowSignUpForm={setShowSignUpForm}
          setShowLogInForm={setShowLogInForm}
        />
      )}
      {showLogInForm && <LogForm />}
      <h5>
        <button
          onClick={toggleSignUpLogIn}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            backgroundColor: 'transparent',
            borderWidth: '0px'
          }}
        >
          {showLogInForm
            ? `Don't have an account? Sign Up`
            : `Already have an account? Log In`}
        </button>
      </h5>
    </>
  )
}

export default HandleUsersPage
