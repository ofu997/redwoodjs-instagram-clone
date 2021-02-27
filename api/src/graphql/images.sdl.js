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
  }

  type Query {
    images: [Image!]!
    image(id: Int!): Image
  }

  input CreateImageInput {
    title: String!
    url: String!
    likes: Int
    userId: Int!
    comments: String!
    likedBy: Int!
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

    updateLikes(id: Int!, currentUserId: Int!): Image!
  }
`
