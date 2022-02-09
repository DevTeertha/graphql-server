var { buildSchema } = require('graphql');
var schema = buildSchema(`
type Mutation {
  setMessage(message: String): String
  createMessage(input: MessageInput): Message
  updateMessage(input: MessageInput): Message
}
input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
}
type Query {
    posts: [Post]
    users: [User]
    post(id: Int!): Post
    user(name: String!): User
    getMessage: Message
  }
  type Post {
    id: Int
    title: String
  }
  type User {
    name: String
    age: Int
  }
`);

exports.module = schema;