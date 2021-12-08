// import { eventCategoryData } from "../../../../components/data";
import { dbConnect } from "../../../../utils/dbConnect";
const ObjectId = require('mongodb').ObjectId;

export default async function handler({ query: { event_category_id } }, res) {
  try {
    let { db } = await dbConnect();
    // fetch the posts
    let event_categories = await db
      .collection("event_categories")
      .find({ _id: ObjectId(event_category_id) })
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(event_categories)),
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
