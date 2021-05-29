import { useMutation, useFlash } from '@redwoodjs/web'
import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/redux/actions/logActions'
import { useState } from 'react'

const LogInForm = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const [state, setState] = useState({
    email: '',
    password: '',
  })
  // const [password, setPassword] = useState('')

  const onChange=e=> {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  // const { userInfo } = userLogin

  // const handleSignIn = data => {
  //   dispatch(login(data.email, data.password))
  // }

  const { addMessage } = useFlash()

  return (
    <>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid olive', width: '50%', minWidth: '200px' }}
          // onSubmit={handleSignIn}
          onSubmit={() => dispatch(login(email,password))}
        >

            {/* <FormError
              error={error}
              loading={loading}
              titleClassName="font-semibold"
              wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
            /> */}

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
                value={state.email}
                onChange={onChange}
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
                value={state.password}
                onChange={onChange}
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

