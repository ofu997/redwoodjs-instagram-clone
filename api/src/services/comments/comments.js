import { db } from 'src/lib/db'

export const comments = () => {
  return db.comment.findMany()
}

export const comment = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment = ({ input }) => {
  return db.comment.create({
    data: input,
  })
}

export const updateComment = ({ id, input }) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment = {
  image: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).image(),
  user: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).user(),
}

export const beforeResolver = rules => {
  rules.skip()
}
