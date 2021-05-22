import { useMutation, useFlash } from '@redwoodjs/web'
import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'


const LOG_IN_MUTATION = gql`
  mutation LogInMutation($input: SignUpOrInInput!) {
    loginUser(input: $input) {
      token
      user {

        id
        name
        email
        handle

        images {
          title
          url
          likes
          userId
        }

      }
    }
  }
`

const LogInForm = () => {
  const [loginUser, { loading, error }] = useMutation(LOG_IN_MUTATION, {
    onCompleted: ({ loginUser }) => {
      addMessage('Signed in', { classes: 'rw-flash-success' })
      const { token, user } = loginUser;
      localStorage.setItem('authToken', JSON.stringify(token));
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

  const { addMessage } = useFlash()

  return (
    <>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid olive', width: '50%', minWidth: '200px' }}
          onSubmit={handleSignIn}
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
                  <p>Log In</p>
                </Submit>
              </div>
            </div>
        </Form>
      </div>
    </>
  )
}

export default LogInForm

