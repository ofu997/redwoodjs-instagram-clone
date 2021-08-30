import {
  Form,
  FormError,
  Label,
  TextField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
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
    <div className='signUpLogInFormWrapper'>
      <h4 className='cntr-h rw-text-center'>Sign up</h4>
      <section className="rw-form-wrapper">
        <Form
          style={{ border: '1px solid #afeeee', boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)' }}
          onSubmit={handleSignUp}
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
                    value: /^.{2,30}$/,
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
                placeholder='your_handle'
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
      </section>
    </div>
  )
}

export default SignUpForm
