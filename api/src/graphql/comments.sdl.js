export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    image: Image!
    imageId: Int!
  }

  type Query {
    comments(imageId: Int!): [Comment!]!
  }

  input CreateCommentInput {
    body: String!
    imageId: Int!
  }

  input UpdateCommentInput {
    body: String
    imageId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    deleteComment(id: Int!): Comment!
  }
`
