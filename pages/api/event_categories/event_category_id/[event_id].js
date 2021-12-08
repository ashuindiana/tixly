import { dbConnect } from "../../../../utils/dbConnect";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(
  { query: { event_category_id, event_id } },
  res
) {
  try {
    let { db } = await dbConnect();
    // fetch the posts
    let event = await db
      .collection("event_categories")
      .aggregate([
        // {
        //   $match: {
        //     _id: ObjectId(event_category_id),
        //   },
        // },
        { $unwind: "$events" },
        {
          $match: {
            "events.id": event_id,
          },
        },
      ])
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(event)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
