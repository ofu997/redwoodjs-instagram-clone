export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    image: Image!
    imageId: Int!
    user: User!
    posterId: Int!
  }

  type Query {
    comments: [Comment!]!
  }

  input CreateCommentInput {
    body: String!
    imageId: Int!
    posterId: Int!
  }

  input UpdateCommentInput {
    body: String
    imageId: Int
    posterId: Int
  }
`
