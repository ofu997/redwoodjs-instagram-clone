export const schema = gql`
  type Image {
    id: Int!
    title: String!
    url: String!
    likes: Int!
  }

  type Query {
    images: [Image!]!
    image(id: Int!): Image
  }

  input CreateImageInput {
    title: String!
    url: String!
    likes: Int!
  }

  input UpdateImageInput {
    title: String
    url: String
    likes: Int
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image!
    updateImage(id: Int!, input: UpdateImageInput!): Image!
    deleteImage(id: Int!): Image!
  }
`
