import { useMutation } from '@redwoodjs/web'
import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

const LOG_IN_MUTATION = gql`
  mutation LogInMutation($input: SignUpOrInInput!) {
    loginUser(input: $input) {
      id
      handle
      localStoragePassword
      profilePicUrl
    }
  }
`

const LogInForm = () => {

  const [loginUser, { loading, error }] = useMutation(LOG_IN_MUTATION, {
    onCompleted: ({ loginUser }) => {
      toast.success('Signed in', { classes: 'rw-flash-success' })
      localStorage.setItem('user', JSON.stringify(loginUser));
      navigate(routes.images())
    },
    onError: (e) => {
      console.log(e)
    },
    ignoreResults: false,
  })

  const handleSignIn = data => {
    loginUser({ variables: { input: data } })
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const type = showPassword ? "text" : "password";

  return (
    <div className='signUpLogInFormWrapper'>
      <h4 className='cntr-h rw-text-center'>Log in</h4>
      <section className="rw-form-wrapper">

        <Form
          style={{ border: '1px solid rgba(0, 0, 255, .2)', boxShadow: '12px 12px 2px 1px #afeeee' }}
          onSubmit={handleSignIn}
          className='signLogForm'
        >

          <FormError
            error={error}
            loading={loading}
            titleClassName="font-semibold"
            wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          />

          <div className='cntr-h'>
            <Label
              name="email"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Email
            </Label>
            <TextField
              name='email'
              validation={{
                required: true,
                pattern: {
                  value: /[^@]+@[^\.]+\..+/,
                },
              }}
              placeholder='Email'
              className="rw-input sign-up-input flex cntr-h"
            />
            <Label
              name="password"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Password
            </Label>
            <TextField
              name='password'
              validation={{ required: true }}
              placeholder='Password'
              className="rw-input sign-up-input flex cntr-h"
              type={type}
            />
            <div className="flex sign-up-in-btn">
              <Submit className="rw-button rw-button-blue">
                <p>Log In</p>
              </Submit>
            </div>
          </div>
        </Form>
      </section>
      <div id="ShowOrMask" >
        <button
          disabled={loading}
          onClick={() => handleShowPassword()}
        >
          <p className="button-with-blue-text" >
            {showPassword ? `Hide password` : `Show password` }
          </p>
        </button>
      </div>
    </div>
  )
}

export default LogInForm
