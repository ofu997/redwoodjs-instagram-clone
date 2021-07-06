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
  input.handle = '@'+input.handle;
  const password = await bcrypt.hash(input.password, 10);
  const isAdmin = (input.email == "ofu997@gmail.com") ? true : false;
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
  const user = await db.user.findUnique({
    where: { email: input.email },
  })
  const { id, handle, isAdmin } = user
  if (!user) {
    throw new Error('Invalid User')
  }
  const passwordMatch = await bcrypt.compare(input.password, user.password)
  if (!passwordMatch) {
    throw new Error('Invalid Login')
  }
  const token = jwt.sign(
    {
      id,
      handle,
      isAdmin,
    },
    'my-secret-from-env-file-in-prod',
    {
      // memo: set this longer
      expiresIn: '1d',
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
    where: { email: input.email }
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
