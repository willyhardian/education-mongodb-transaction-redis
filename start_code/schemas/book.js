const { GraphQLError } = require("graphql");
const Book = require("../models/Book");
const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];
const typeDefs = `#graphql
  type Book {
    _id: ID
    title: String
    author: String
  } 
  type Query {
    allBooks: [Book]
    bookById(id: ID!): Book
    bookByTitle(title: String!): Book
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    allBooks: async (_, __, contextValue) => {
      const books = await Book.findAll();
      return books;
    },
    bookById: (_, args, contextValue) => {
      return books.find((book) => book.id === String(args.id));
    },
    bookByTitle: (_, args, contextValue) => {
      try {
        if (args.title.length < 2) {
          throw {
            message: "karakter title di bawah 2",
            code: "BAD_REQUEST",
          };
        }
        return books.find((book) => book.title === String(args.title));
      } catch (err) {
        if (err?.code === "BAD_REQUEST") {
          throw new GraphQLError(err.message, {
            extensions: { code: err.code },
          });
        } else {
          throw err;
        }
      }
    },
  },
  Mutation: {
    addBook: async (_, args, contextValue) => {
      const { title, author } = args;
      const bookAdded = await Book.create({
        title,
        author,
      });
      return bookAdded;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
