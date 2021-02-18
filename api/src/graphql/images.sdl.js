export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    likes: Int
    comments: [Comment]!
    likedBy: [User]!
    author: User
  }

  type Query {
    images: [Image!]!
  }

  input CreateImageInput {
    title: String!
    url: String!
    likes: Int
  }

  input UpdateImageInput {
    title: String
    url: String
    likes: Int
  }
`
