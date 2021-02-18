import { db } from 'src/lib/db'

export const comments = () => {
  return db.comment.findMany()
}

export const Comment = {
  image: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).image(),
  user: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).user(),
}
