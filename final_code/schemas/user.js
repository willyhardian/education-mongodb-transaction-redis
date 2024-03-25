const { GraphQLError } = require("graphql");
const Book = require("../models/Book");
const { client, db } = require("../config/mongodbConnection");
const { ObjectId } = require("mongodb");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    balance: Int
    
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Mutation {
    transferMoney(nominal: Int): User
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    transferMoney: async (_, args, contextValue) => {
      const { nominal } = args;
      const session = client.startSession();
      try {
        await session.withTransaction(async () => {
          const coll1 = db.collection("users");
          //   const coll2 = client.db("mydb2").collection("bar");
          // Important:: You must pass the session to the operations
          //   await coll1.insertOne({ abc: 1 }, { session });
          await coll1.updateOne(
            { _id: new ObjectId("65b86523a50e56c0735a3a10") },
            { $inc: { balance: -nominal } },
            { session }
          );

          const receiver = await coll1.findOne(
            { _id: new ObjectId("65b896b5a50e56c0735a3a11") },
            { session }
          );
          console.log(receiver, "<< receiver");
          if (receiver.balance < nominal) {
            throw new Error("balance is not enough");
          }
          await coll1.updateOne(
            { _id: new ObjectId("65b896b5a50e56c0735a3a11") },
            { $inc: { balance: nominal } },
            { session }
          );
          //   await coll2.insertOne({ xyz: 999 }, { session });
        });
      } finally {
        await session.endSession();
      }
      return {
        _id: new ObjectId("65b86523a50e56c0735a3a10"),
        balance: nominal,
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
