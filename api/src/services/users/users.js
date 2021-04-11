import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const updateUserLikes = ({ id, imageId }) => {
  return db.user.update({
    data: {
      userLikes: {
        connect: {
          imageId: imageId
        }
      }
    },
    where: { id },
  })
}

export const findUserByHandle = ({ handle }) => {
  return db.user.findUnique({
    where: { handle },
  })
}

export const findUserByEmail = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}

export const loginUser = ({ handle, password }) => {
  return 0;
}

export const findUserByPassword = ({ password }) => {
  return db.user.findUnique({
    where: { password },
  })
}

export const signIn = ({ input }) => {
  // // howtographql example
  // // 1
  // const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  // if (!user) {
  //   throw new Error('No such user found')
  // }

  // // 2
  // const valid = await bcrypt.compare(args.password, user.password)
  // if (!valid) {
  //   throw new Error('Invalid password')
  // }

  // const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // // 3
  // return {
  //   token,
  //   user,
  // }

  const  {email, password} = input
  console.log('services/signup-signin.js')

  const userByEmail = db.user.findUnique({
    where: { email }
  })

  console.log(userByEmail)

  // const userByPassword = findUserByPassword(password)

  // const userByEmail = db.user.findUnique({
  //   where: { email }
  // })

  // if (userByEmail.id === userByPassword.id) {
  //   signedIn = true
  //   console.log('they match')
  //   console.log(signedIn)
  // }



  localStorage.setItem('user', JSON.stringify.userByPassword)

  return userByEmail
}

export const User = {
  userLikes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userLikes(),
  images: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).images(),
  comments: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).comments(),
}

// Open Mutation.js and add the new login and signup resolvers (you’ll add the post resolver in a bit):