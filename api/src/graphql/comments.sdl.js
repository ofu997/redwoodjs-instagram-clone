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
    comment(id: Int!): Comment
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

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    updateComment(id: Int!, input: UpdateCommentInput!): Comment!
    deleteComment(id: Int!): Comment!
  }
`
