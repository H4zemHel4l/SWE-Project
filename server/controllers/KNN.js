import { User } from "../models/User.js";
import { ObjectId } from "mongodb"; // Ensure ObjectId is properly imported

function calculateSimilarity(category1, category2) {
  const similarity = category1 === category2 ? 1 : 0;
  return similarity;
}

async function retrieveRandomBooks(req, res) {
  try {
    const userId = req.params._id;
    const user = await User.findOne({ _id: ObjectId(userId) });

    if (user) {
      const freqList = user.freqList;

      const sortedList = freqList.sort((a, b) => b.frequency - a.frequency);
      const categorys = sortedList.map((item) => item.category);

      const randomBooks = await Book.aggregate([
        {
          $addFields: {
            similarity: {
              $sum: categorys.map((category) =>
                  calculateSimilarity(category, "$category")
              ),
            },
          },
        },
        { $sort: { similarity: -1 } },
        { $limit: 5 },
      ]).toArray();

      console.log("Random Books:");
      console.log(randomBooks);

      // Depending on your use case, you might want to send the result back to the client
      res.json({ status: "Success", data: { randomBooks } });
    } else {
      console.log(`User with ID ${userId} not found`);
      res.status(404).json({ status: "Fail", message: `User not found with ID ${userId}` });
    }
  } catch (error) {
    console.error("Error retrieving random books:", error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
}

export default retrieveRandomBooks;
