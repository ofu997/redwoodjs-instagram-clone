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
    images: [Image!]!
    image(id: Int!): Image
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
    createImage(input: CreateImageInput!): Image!
    updateImage(id: Int!, input: UpdateImageInput!): Image!
    deleteImage(id: Int!): Image!

    incrementImageLikes(id: Int!, currentUserId: Int!): Image!
    decrementImageLikes(id: Int!, currentUserId: Int!): Image!
  }
`
