import { motion } from "framer-motion";
import Switcher from "../components/EventComponentSwitcher/Switcher";
import { server } from "../config";
import { dbConnect } from "../utils/dbConnect";

function positions({ live_data, past_data }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      exit={{
        opacity: 0,
        x: -50,
        transitionDelay: 0.3,
      }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Switcher live_data={live_data} past_data={past_data} />
    </motion.div>
  );
}

export default positions;

export async function getStaticProps(context) {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let liveEvent_data = await db
      .collection("liveEvents_data")
      .find({})
      .toArray();

    let pastEvent_data = await db
      .collection("pastEvents_data")
      .find({})
      .toArray();

    return {
      props: {
        live_data: JSON.parse(JSON.stringify(liveEvent_data)),
        past_data: JSON.parse(JSON.stringify(pastEvent_data)),
      },
      revalidate: 1,
    };
  } catch (error) {
    // return the error
    throw Error(error);
  }
  // const live_res = await fetch(`${server}/api/positions/live_events`);
  // const live_data = await live_res.json();

  // const past_res = await fetch(`${server}/api/positions/past_events`);
  // const past_data = await past_res.json();

  // return {
  //   props: {
  //     live_data: live_data.message,
  //     past_data: past_data.message,
  //   }, // will be passed to the page component as props
  // };
}
