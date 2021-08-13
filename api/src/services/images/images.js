import { db } from 'src/lib/db'

export const images = () => {
  return db.image.findMany({
    orderBy : {
      id : 'desc'
    }
  })
}

export const image = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const createImage = ({ input }) => {
  const now = new Date()
  const monthNames = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec']
  const year = `'${now.getFullYear().toString().slice(2)}`;
  const createdAt = `${now.getDate()} ${monthNames[now.getMonth()]} ${year}`;
  return db.image.create({
    data: {
      userId: {
        connect: { id: input.userId }
      },
      ...input,
      createdAt
    }
  })
}

export const updateImage = ({ id, input }) => {
  return db.image.update({
    data: input,
    where: { id },
  })
}

export const deleteImage = ({ id }) => {
  return db.image.delete({
    where: { id },
  })
}

export const incrementImageLikes = ({ id, currentUserId }) => {
  return db.image.update({
    data: {
      likes: {
        increment: 1
      },
      likedBy: {
        connect: {
          id: currentUserId
        }
      }
    },
    where: { id },
  })
}

export const decrementImageLikes = ({ id, currentUserId }) => {
  return db.image.update({
    data: {
      likes: {
        decrement: 1
      },
      likedBy: {
        disconnect: {
          id: currentUserId
        }
      }
    },
    where: { id },
  })
}

export const Image = {
  comments: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).comments(),
  likedBy: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).likedBy(),
  user: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).user(),
}

export const beforeResolver = rules => {
  rules.skip()
}
