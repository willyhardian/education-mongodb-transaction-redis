const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: typeDefsBook,
  resolvers: resolversBook,
} = require("./schemas/book");
const {
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
} = require("./schemas/user");

const server = new ApolloServer({
  typeDefs: [typeDefsBook, typeDefsUser],
  resolvers: [resolversBook, resolversUser],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      id: "200",
      name: "andy",
    };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
