// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from "../../../utils/dbConnect";

export default async function handler(req, res) {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let event_categories = await db
      .collection("event_categories")
      .find({})
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
