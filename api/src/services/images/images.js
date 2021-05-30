import { db } from 'src/lib/db'

export const images = () => {
  return db.image.findMany()
}

export const image = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  })
}

export const createImage = ({ input }) => {
  return db.image.create({
    // data: { userId: { connect: { id: {userId} }}, ...input}
    data: input
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

export const updateLikes = ({ id, currentUserId }) => {
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

export const Image = {
  comments: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).comments(),
  likedBy: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).likedBy(),
  user: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).user(),
}
