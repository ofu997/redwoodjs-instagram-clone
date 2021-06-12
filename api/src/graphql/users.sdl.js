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
    email: String
    password: String
  }

  input SignUpOrInInput {
    email: String!
    password: String!
  }

  input CreateOrUpdateUserInfo {
    bio: String
    profilePicUrl: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
    createOrUpdateUserInfo(id: Int!, input: CreateOrUpdateUserInfo!): User!

    updateUserLikes(imageId: Int!, currentUserId: Int!): User!
    loginUser(input: SignUpOrInInput!): LoginResponse
  }
`
