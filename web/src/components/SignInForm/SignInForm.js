import { useMutation, useFlash } from '@redwoodjs/web'
import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { navigate, routes } from '@redwoodjs/router'
// import { signIn } from 'src/services/signup-signin/signup-signin'


const SIGN_IN_MUTATION = gql`
  mutation SignInMutation($input: SignUpOrInInput!) {
    signIn(input: $input) {
      id
    }
  }
`

// for not using <form>
// const SIGN_IN_MUTATION = gql`
//   mutation SignInMutation($email: String!, $password: String!) {
//     signIn(email: $email, password: $password) {
//       id
//     }
//   }
// `

const SignInForm = () => {

  const { logIn, logOut, currentUser, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const FIND_USER_BY_EMAIL = gql`
    query ($email: String!) {
      findUserByEmail (email: $email) {
        id
        password
      }
    }
  `

  const FIND_USER_BY_PASSWORD = gql`
    query ($password: String!) {
      findUserByPassword (password: $handle) {
        id
        password
      }
    }
  `
  const { addMessage } = useFlash()

  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: () => {
      // navigate(routes.images())
      // loading && addMessage('loading', { classes: 'rw-flash-success' })
      // error && addMessage('error', { classes: 'rw-flash-success' })
      addMessage('Signed in', { classes: 'rw-flash-success' })
      console.log('signed in')
    },
  })


  // const [getUserByEmail, { loading, data }] = useLazyQuery(FIND_USER_BY_EMAIL)

  // const [getUserByPassword, { loading, data }] = useLazyQuery(FIND_USER_BY_PASSWORD)


  // const { loading, error, data } = useQuery(FIND_USER_BY_HANDLE, {
  //   onCompleted: () => {
  //     navigate(routes.images())
  //   }
  // })

  // example
  // function DogPhoto({ breed }) {
  //   const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
  //     variables: { breed },
  //   });

  //   if (loading) return null;
  //   if (error) return `Error! ${error}`;

  //   return (
  //     <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
  //   );
  // }

  // const [findUserByHandle] = useMutation(FIND_USER_BY_HANDLE, {
  //   // onCompleted logic

  // })

  //   const [findUserByPassword] = useMutation(FIND_USER_BY_PASSWORD, {
  //     // onCompleted logic
  //   })

  const handleSignIn = (data) => {
    // console.log(data)
    // logIn();
    // getUserByHandle({ variables: { handle: input.handle } });
    // getUserByPassword({ variables: { password: input.password } })
    // console.log(data)
    // findUserByHandle({ variables: { handle: input.handle } })
    // findUserByPassword({ variables: { password: input.password } })

    // signin by mutation
    signIn({ variables: { input: data } })

    // when not using <form>
    // signIn(email, password)
  }


  return (

    <>
      <div className="rw-form-wrapper" style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', padding: '4 rem' }}>
        <Form
          style={{ border: '1px solid olive', width: '50%', minWidth: '200px' }}
          onSubmit={handleSignIn}

        >

            <FormError
              error={error}
              titleClassName="font-semibold"
              wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
            />

            <div
              className='cntr-h'
            >
              {/*
              // unneeded fields for now
              <Label
                name="name"
                className="rw-label flex"
                errorClassName="rw-label rw-label-error"
              >
                Name
              </Label>
              <TextField
                name='name'
                validation={{ required: false }}
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
                validation={{ required: false }}
                placeholder='@your_handle'
                className="sign-up-input flex cntr-h"
              /> */}

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
      {/* {loading && <h1>loading!!</h1>}
      {data && (
        <h3>{data.password}</h3>
      )} */}
    </>

    // not using <form>
    // <>
    //   <form
    //     // onSubmit={async (e) => {
    //     //   e.preventDefault()

    //     //   await signUp({ variables: { email, password } })
    //     //   signIn({ email, password })
    //     // }}
    //     onSubmit={handleSignIn}
    //   >
    //     <label>
    //       <input
    //         placeholder='email'
    //         onChange={event => setEmail(event.target.value)}
    //         value={email}
    //       />
    //     </label>

    //     <br />

    //     <label>
    //       <input
    //         placeholder='password'
    //         onChange={event => setPassword(event.target.value)}
    //         value={password}
    //       />
    //     </label>
    //     <button
    //       onClick={e => {
    //         // getUserByHandle({ variables: { handle:  handle  } })
    //         e.preventDefault()
    //         // getUserByHandle({
    //         //   handle, password
    //         // })
    //         signIn({ email, password })
    //       }}
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </>
  )
}

export default SignInForm

