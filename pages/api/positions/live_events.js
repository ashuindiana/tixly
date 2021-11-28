import { dbConnect } from "../../../utils/dbConnect";

export default async function handler(req, res) {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let liveEvent_data = await db
      .collection("liveEvents_data")
      .find({})
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(liveEvent_data)),
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
