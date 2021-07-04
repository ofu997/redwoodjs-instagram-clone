import {
  Form,
  FormError,
  Label,
  TextField,
  FieldError,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const SignUpForm = props => {
  const [signIn, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => {
      toast.success('User created', { classes: 'rw-flash-success' })

      setTimeout(() => {
        // navigate(routes.images())
        props.setShowSignUpForm(false)
        props.setShowLogInForm(true)
      }, 50)
    },
    onError: (e) => {
      console.log(e)
    },
    ignoreResults: false,
  })

  const handleSignUp = input => {
    signIn({ variables: { input } })
  }

  return (
    <div>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid #afeeee', width: '50%', minWidth: '200px', padding: '50px', marginTop: '75px', boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)' }}
          onSubmit={handleSignUp}
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
                name="name"
                className="rw-label flex"
                errorClassName="rw-label rw-label-error"
              >
                Name
              </Label>
              <TextField
                name='name'
                validation={{
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9_]{2,30}$/,
                  }
                }}
                placeholder='Name'
                className="rw-input sign-up-input flex cntr-h"
              />
              <FieldError name='name' className="rw-field-error" />

              <Label
                name="handle"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Handle
              </Label>
              <TextField
                name='handle'
                validation={{ required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9_]{2,30}$/,
                  }
                }}
                placeholder='@your_handle'
                className="rw-input sign-up-input flex cntr-h"
              />
              <FieldError name='handle' className="rw-field-error" />

              <Label
                name="email"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Email
              </Label>
              <TextField
                name='email'
                validation={{ required: true,
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
                  <p>Sign Up</p>
                </Submit>
              </div>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUpForm
