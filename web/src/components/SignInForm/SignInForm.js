import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'

const SignInForm = () => {
  const { logIn, logOut, isAuthenticated } = useAuth()

  const handleSignUp = input => {
    logIn();
    authenticateUser({ variables: { input } })
  }

  return (

    <div>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid olive', width: '50%', minWidth: '200px' }}
          onSubmit={handleSignUp}
        >

            <FormError
              titleClassName="font-semibold"
              wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
            />

            <div
              className='cntr-h'
            >
              <Label
                name="name"
                className="rw-label flex"
                errorClassName="rw-label rw-label-error"
              >
                Name
              </Label>
              <TextField
                name='name'
                validation={{ required: true }}
                placeholder='Name'
                className="sign-up-input flex cntr-h"
              />

              <Label
                name="handle"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Handle
              </Label>
              <TextField
                name='handle'
                validation={{ required: true }}
                placeholder='@your_handle'
                className="sign-up-input flex cntr-h"
              />

              <Label
                name="email"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Email
              </Label>
              <TextField
                name='email'
                validation={{ required: true }}
                placeholder='Email'
                className="sign-up-input flex cntr-h"
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
                className="sign-up-input flex cntr-h"
              />

              <div className="flex sign-up-in-btn">
                <Submit className="rw-button rw-button-blue">
                  <p>Sign In</p>
                </Submit>
              </div>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm

