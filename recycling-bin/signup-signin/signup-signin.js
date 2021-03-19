// import {
//   findUserByEmail,
//   findUserByPassword,
//   verfifyPassword,
// } from 'src/services/users/users'

// // import { authenticateUser } from 'src/lib/auth'

// import { createUser } from 'src/services/users/users'

// // export const signIn = async ({ email, password }) => {
// //   console.log('services/signup-signin.js')
// //   const user = await findUserByEmail(email)

// //   const userByPassword = findUserByPassword(password)

// //   if (user.id === userByPassword.id) {

// //   }
// //   // return authenticateUser(email, password)
// // }

// export const signIn = ({ input }) => {
//   console.log('services/signup-signin.js')

//   const userByEmail = findUserByEmail(input.email)

//   const userByPassword = findUserByPassword(input.password)

//   if (userByEmail.id === userByPassword.id) {
//     console.log('sign in works')
//   }
// }

// export const signUp = async ({ input: { email, password } }) => {
//   const existing = await findUserByEmail(email)

//   if (existing) {
//     throw 'signup error'
//   }

//   return createUser({
//     email,
//     password,
//   })
// }
