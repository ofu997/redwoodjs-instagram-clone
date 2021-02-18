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
    data: input,
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

// export const updateLikes = ({ id, likes }) => {
//   return db.image.update({
//     data: {
//       likes: {
//         increment: 1
//       }
//     },
//     where: { id },
//   })
// }

export const updateLikes = ({ id }) => {
  return db.image.update({
    data: {
      likes: {
        increment: 1
      }
    },
    where: { id },
  })
}
