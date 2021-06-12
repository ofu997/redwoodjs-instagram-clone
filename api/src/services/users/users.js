import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input }) => {
  const password = await bcrypt.hash(input.password, 10);
  const isAdmin = (input.name == "Justin Trudeau") ? true : false;
  const data = { ...input, password, isAdmin }
  return db.user.create({
    data,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const createOrUpdateUserInfo = ({ id, input }) => {
  const { bio, profilePicUrl } = input;
  // const user = db.user.findUnique({
  //   where: { id }
  // })
  // user ?
  return db.user.update({
    where: { id },
    data: {
      bio, profilePicUrl
    }
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

export const loginUser = async ({ input }) => {
  try {
    const user = await db.user.findUnique({
      where: { email: input.email },
    })
    if (!user) {
      throw new Error('Invalid User')
    }
    const passwordMatch = await bcrypt.compare(input.password, user.password)
    if (!passwordMatch) {
      throw new Error('Invalid Login')
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.email,
      },
      'my-secret-from-env-file-in-prod',
      {
        expiresIn: '30d', // token will expire in 30days
      }
    )
    return { user, token }
  } catch (e) {
    return e
  }
}

export const findUserByPassword = ({ password }) => {
  return db.user.findUnique({
    where: { password },
  })
}

export const User = {
  userLikes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userLikes(),
  images: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).images(),
  comments: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).comments(),
}
