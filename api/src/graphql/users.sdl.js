export const schema = gql`
  type User {
    id: Int!
    name: String!
    handle: String!
    email: String!
    password: String!
    userLikes: [Image]!
    images: [Image]!
    comments: [Comment]!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  input CreateUserInput {
    name: String!
    handle: String!
    email: String!
    password: String!

    userLikes: String!
    images: String!
    comments: String!
  }

  input UpdateUserInput {
    name: String
    handle: String
    email: String
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
