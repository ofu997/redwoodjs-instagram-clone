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
    profilePicUrl: String
    bio: String
    jwt: String
    localStoragePassword: String
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
  }

  input UpdateUserInput {
    name: String
    handle: String
    bio: String
    profilePicUrl: String
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

    addToUserLikes(imageId: Int!, id: Int!): User!
    removeFromUserLikes(imageId: Int!, id: Int!): User!
    loginUser(input: SignUpOrInInput!): User!
    logoutUser(id: Int!): User!
  }
`
