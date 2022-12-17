import { db } from 'src/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import usableEmails from 'src/lib/usable-emails'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input }) => {
  const email = input.email.toLowerCase().trim();
  if (!usableEmails.includes(email)) {
    throw new Error('Not authorized to register')
  }
  const handleIsTaken = await db.user.findUnique({
    where: { handle: input.handle }
  })
  if (handleIsTaken) {
    throw new Error(`Handle: ${handleIsTaken.handle} is already taken`)
  }
  const emailIsTaken = await db.user.findUnique({
    where: { email }
  })
  if (emailIsTaken) {
    throw new Error(`Email: ${emailIsTaken.email} is already taken`)
  }
  const password = await bcrypt.hash(input.password, 10);
  const isAdmin = (email == "ofu997@gmail.com") ? true : false;
  const data = { ...input, email, password, isAdmin }
  return db.user.create({
    data,
  })
}

export const updateUser = async ({ id, input }) => {
  if (input.password) {
    input.password = await bcrypt.hash(input.password, 10);
  }
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

export const addToUserLikes = ({ imageId, id }) => {
  return db.user.update({
    data: {
      userLikes: {
        connect: {
          id: imageId
        }
      }
    },
    where: { id },
  })
}

export const removeFromUserLikes = ({ imageId, id }) => {
  return db.user.update({
    data: {
      userLikes: {
        disconnect: {
          id: imageId
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
  const email = input.email.toLowerCase().trim()
  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user) {
    throw new Error('Invalid user')
  }
  const { id, handle, isAdmin } = user
  const passwordMatch = await bcrypt.compare(input.password, user.password)
  if (!passwordMatch && input.password != user.password) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign(
    {
      id,
      handle,
      isAdmin,
    },
    `${process.env.MY_SECRET}`,
    {
      // memo: set this longer
      expiresIn: '7d',
    }
  )

  const generatePassword = () => {
    let length=15, result = "",
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]\{}|;':,./<>?";

    for (let i=0, n = charset.length; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * n));
    }
    return result;
  };

  const localStoragePassword = generatePassword();

  return db.user.update({
    data: {
      jwt: token,
      localStoragePassword,
    },
    where: { email }
  })
}

export const logoutUser = ({ id }) => {
  return db.user.update({
    data: {
      jwt: null,
      localStoragePassword: null
    },
    where: { id }
  })
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

export const beforeResolver = rules => {
  rules.skip()
}
