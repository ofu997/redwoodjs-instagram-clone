import { db } from 'src/lib/db'

export const images = () => {
  return db.image.findMany()
}

export const Image = {
  comments: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).comments(),
  likedBy: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).likedBy(),
  author: (_obj, { root }) =>
    db.image.findUnique({ where: { id: root.id } }).author(),
}
