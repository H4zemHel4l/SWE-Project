async function increasecategoryFrequency(userId, category) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const user = await collection.findOne({ _id: ObjectId(userId) });

    if (user) {
      const freqList = user.freqList;

      const categoryIndex = freqList.findIndex(
        (attr) => attr.category === category
      );

      if (categoryIndex !== -1) {
        freqList[categoryIndex].frequency += 1;

        await collection.updateOne(
          { _id: ObjectId(userId) },
          { $set: { freqList: freqList } }
        );
      } else {
        console.log(
          `category '${category}' not found in the user's freqList attribute`
        );
      }
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.error("Error increasing category frequency:", error);
  } finally {
    client.close();
  }
}

const userId = "test";
const category = "test";

increasecategoryFrequency(userId, category);
