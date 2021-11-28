import { dbConnect } from "../../utils/dbConnect";

// dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      return addEventCateg(req, res);
    }
  }
};

// Adding a new post
async function addEventCateg(req, res) {
  try {
    let { db } = await dbConnect();
    await db.collection("pastEvents_data").insertMany(req.body);
    return res.json({
      message: "Past Events Data added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
