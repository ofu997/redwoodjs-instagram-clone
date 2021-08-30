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

      const { id, handle, localStoragePassword, profilePicUrl } = loginUser;
      const user = { id, handle, localStoragePassword, profilePicUrl }
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        navigate(routes.images())
      }, 50)
    },
    onError: (e) => {
      console.log(e)
    },
    ignoreResults: false,
  })

  const handleSignIn = data => {
    loginUser({ variables: { input: data } })
  }

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

            <div
              className='cntr-h'
            >
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
              />

              <div className="flex sign-up-in-btn">
                <Submit className="rw-button rw-button-blue">
                  <p>Log In</p>
                </Submit>
              </div>
            </div>
        </Form>
      </section>
    </div>
  )
}

export default LogInForm
