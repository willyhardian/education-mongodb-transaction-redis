// const { GraphQLError } = require("graphql");
// const books = [
//   {
//     id: "1",
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     id: "2",
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];
// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     id: ID!
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     allBooks: [Book]
//     bookById(id: ID!): Book
//     bookByTitle(title: String!): Book
//   }

//   type Mutation {
//     addBook(title: String, author: String): Book
//   }
// `;

// // Resolvers define how to fetch the types defined in your schema.
// // This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     allBooks: () => {
//       return books;
//     },
//     bookById: (_, args, contextValue) => {
//       console.log(args, "<< DEBUG args");
//       return books.find((book) => book.id === String(args.id));
//     },
//     bookByTitle: (_, args, contextValue) => {
//       try {
//         console.log(args, "<< DEBUG args");
//         if (args.title.length < 2) {
//           // throw new Error("karakter title di bawah 2");
//           throw {
//             message: "karakter title di bawah 2",
//             code: "BAD_REQUEST",
//           };
//         }
//         return books.find((book) => book.title === String(args.title));
//       } catch (err) {
//         if (err?.code === "BAD_REQUEST") {
//           throw new GraphQLError(err.message, {
//             extensions: { code: err.code },
//           });
//         }
//       }
//     },
//   },
//   Mutation: {
//     addBook: (_, args, contextValue) => {
//       const { title, author } = args;

//       const bookAdded = {
//         //id: String(Number(books[books.length].id) + 1),
//         id: "100",
//         title,
//         author,
//       };
//       books.push(bookAdded);
//       return bookAdded;
//     },
//   },
// };

// module.exports = {
//   typeDefs,
//   resolvers,
// };
