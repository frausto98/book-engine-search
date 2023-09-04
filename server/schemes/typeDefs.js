const typeDefs = `
type User {
    _id: ID,
    username: String,
    email: String,
    password: String,
    savedBooks: [Book]
}

type Book {
    bookId: ID,
    authors: [String],
    description: String,
    bookId: String,
    image: String,
    link: String,
    title: String
}

type Auth {
    token: ID!,
    user: User
}

type Query {
    user(username: String!): User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(profileId: ID!, bookData: Book!): User
    deleteBook(profileId: ID!, bookId: ID!): User
    login(email: String!, password: String!): Auth
}
`