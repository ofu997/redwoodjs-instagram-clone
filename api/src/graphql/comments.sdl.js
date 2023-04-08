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
    comments: [Comment!]! @skipAuth
    comment(id: Int!): Comment @skipAuth
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
    createComment(input: CreateCommentInput!): Comment! @skipAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @skipAuth
    deleteComment(id: Int!): Comment! @skipAuth
  }
`
