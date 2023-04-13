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
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth

    findUserByHandle(handle: String!): User @skipAuth
    findUserByPassword(password: String!): User @skipAuth
    findUserByEmail(email: String!): User @skipAuth
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
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: Int!): User! @skipAuth

    addToUserLikes(imageId: Int!, id: Int!): User! @skipAuth
    removeFromUserLikes(imageId: Int!, id: Int!): User! @skipAuth
    loginUser(input: SignUpOrInInput!): User! @skipAuth
    logoutUser(id: Int!): User! @skipAuth
  }
`
