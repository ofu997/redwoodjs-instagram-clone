import { db } from 'src/lib/db'

export const comments = ({ imageId }) => {
  return db.comment.findMany({ where: { imageId } })
}

export const Comment = {
  image: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).image(),
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}

export const deleteComment = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}