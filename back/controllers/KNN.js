import { User } from "../models/User.js";
function calculateSimilarity(category1, category2) {
  const similarity = category1 === category2 ? 1 : 0;
  return similarity;
}
async function retrieveRandomBooks(userId) {
  try {
    userId = req.params._id;
    const user = await User.findOne({ _id: ObjectId(userId) });

    if (user) {
      const freqList = user.freqList;

      const sortedList = freqList.sort((a, b) => b.frequency - a.frequency);

      const categorys = sortedList.map((item) => item.category);

      const randomBooks = await bookCollection
        .aggregate([
          {
            $addFields: {
              similarity: {
                $sum: categorys.map((category) =>
                  calculateSimilarity(category, "$category")
                ),
              },
            },
          },
          { $sort: { similarity: -1 } }, // Sort by similarity in descending order
          { $limit: 5 }, // Retrieve top 5 books with highest similarity
        ])
        .toArray();

      console.log("Random Books:");
      console.log(randomBooks);
    } else {
      console.log(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.error("Error retrieving random books:", error);
  }
}

export default retrieveRandomBooks;
