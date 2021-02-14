import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const SignUpForm = () => {


  const handleSignUp = input => {
    createUser({ variables: { input } })
  }

  return (

    <div>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid olive', width: '50%', minWidth: '200px' }}
          onSubmit={handleSignUp}
        >

            <FormError
              // error={error}
              titleClassName="font-semibold"
              wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
            />

            <div
              // style={{ margin: '0 auto' }}
              className='cntr-h'
            >
              <Label
                name="title"
                className="rw-label flex"
                errorClassName="rw-label rw-label-error"
              >
                Title
              </Label>
              <TextField
                name='name'
                validation={{ required: true }}
                placeholder='Name'
                className="sign-up-input flex cntr-h"
              />

              <Label
                name="title"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Title
              </Label>
              <TextField
                name='email'
                validation={{ required: true }}
                placeholder='Email'
                className="sign-up-input flex cntr-h"
              />

              <Label
                name="title"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Title
              </Label>
              <TextField
                name='password'
                validation={{ required: true }}
                placeholder='Password'
                className="sign-up-input flex cntr-h"
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
