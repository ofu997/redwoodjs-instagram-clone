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
    isAdmin: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User

    findUserByHandle(handle: String!): User
    findUserByPassword(password: String!): User
    findUserByEmail(email: String!): User
  }

  type LoginResponse {
    token: String
    user: User
  }

  input CreateUserInput {
    name: String!
    handle: String!
    email: String!
    password: String!
    isAdmin: Boolean!
  }

  input UpdateUserInput {
    name: String
    handle: String
    email: String
    password: String
  }

  input SignUpOrInInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!

    updateUserLikes(imageId: Int!, currentUserId: Int!): User!
    loginUser(input: SignUpOrInInput!): LoginResponse
  }
`