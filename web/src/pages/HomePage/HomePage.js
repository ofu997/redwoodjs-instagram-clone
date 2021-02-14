import { useState } from 'react'

import SignUpForm from 'src/components/SignUpForm/SignUpForm.js'

const HomePage = () => {
  const [showSignUp, setShowSignUp] = useState(false)
  const changeShowSignUp = () => {
    setShowSignUp(!showSignUp)
    console.log(showSignUp)
  }

  return (
    <>
      <h2
        onClick={changeShowSignUp}
      >
        Sign up
      </h2>
      <h1>Login</h1>

      {showSignUp &&
        <SignUpForm />
      }
    </>
  )
}

export default HomePage
