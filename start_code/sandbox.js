
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://dhimashary:dhimashary@cluster0.mtmcc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Send a ping to confirm a successful connection
    const db = client.db("februaryFox");
    const collection = db.collection("movies");

    const id = '65b74c918018c4084ddce50b';

    const doc = {
      title: "Record of a Shriveled Datum",
    };

    // const result = await collection.insertOne({
    //   ...doc,
    // });

    const result = await collection.find({
      // _id: new ObjectId('65b74c918018c4084ddce50b')
    }).toArray();
    // 
    console.log("Pinged your deployment. You successfully connected to MongoDB!", result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
