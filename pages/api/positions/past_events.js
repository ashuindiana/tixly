import { dbConnect } from "../../../utils/dbConnect";

export default async function handler(req, res) {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let pastEvent_data = await db
      .collection("pastEvents_data")
      .find({})
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(pastEvent_data)),
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
