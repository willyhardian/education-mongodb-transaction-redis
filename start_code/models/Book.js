const { db } = require("../config/mongodbConnection");

class Book {
  static async findAll() {
    const bookCollection = db.collection("books");
    const books = await bookCollection.find().toArray();
    // await bookCollection.aggregate([
    //   {
    //     $match:
    //       /**
    //        * query: The query in MQL.
    //        */
    //       {
    //         _id: {
    //           $oid: "65b8b0d6a50e56c0735a3a12",
    //         },
    //       },
    //   },
    //   {
    //     $lookup:
    //       /**
    //        * from: The target collection.
    //        * localField: The local join field.
    //        * foreignField: The target join field.
    //        * as: The name for the results.
    //        * pipeline: Optional pipeline to run on the foreign collection.
    //        * let: Optional variables to use in the pipeline field stages.
    //        */
    //       {
    //         from: "Follows",
    //         localField: "_id",
    //         foreignField: "followerId",
    //         as: "followings",
    //       },
    //   },
    //   {
    //     $lookup:
    //       /**
    //        * from: The target collection.
    //        * localField: The local join field.
    //        * foreignField: The target join field.
    //        * as: The name for the results.
    //        * pipeline: Optional pipeline to run on the foreign collection.
    //        * let: Optional variables to use in the pipeline field stages.
    //        */
    //       {
    //         from: "Users",
    //         localField: "followings.followingId",
    //         foreignField: "_id",
    //         as: "UserFollowings",
    //       },
    //   },
    // ]).toArray()
    return books;
  }

  static async create(newBook) {
    const bookCollection = db.collection("books");
    const book = await bookCollection.insertOne(newBook);

    return {
      _id: book.insertedId,
      ...newBook,
    };
  }
}

module.exports = Book;
