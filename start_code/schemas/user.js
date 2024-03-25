const { GraphQLError } = require("graphql");
const { client, db } = require("../config/mongodbConnection");
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
  type User {
    _id: ID
    balance: Int
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
