export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    likes: Int
    comments: [Comment]!
    likedBy: [User]!
    user: User!
    userId: Int!
    createdAt: String!
  }

  type Query {
    images: [Image!]! @skipAuth
    image(id: Int!): Image @skipAuth
  }

  input CreateImageInput {
    title: String!
    url: String!
    userId: Int!

  }

  input UpdateImageInput {
    title: String
    url: String
    likes: Int
    userId: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @skipAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @skipAuth
    deleteImage(id: Int!): Image! @skipAuth

    incrementImageLikes(id: Int!, currentUserId: Int!): Image! @skipAuth
    decrementImageLikes(id: Int!, currentUserId: Int!): Image! @skipAuth
  }
`
