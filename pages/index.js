import Carousel from "../components/Carousel/Carousel";
import ContentCards from "../components/ContentCards/ContentCards";
import { motion } from "framer-motion";
import { useState } from "react";
import { server } from "../config";
import { dbConnect } from "../utils/dbConnect";

function Home({ eventCategoryData }) {
  const [selectedEvent, setSelectedEvent] = useState(0);

  const handleSelectedEvent = (_id) => (e) => {
    const [_, category_id] = _id.split("_");
    setSelectedEvent(Number(category_id));
  };

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
      <Carousel
        eventCategoryData={eventCategoryData}
        selectedEvent={selectedEvent}
        handleSelectedEvent={handleSelectedEvent}
      />
      <ContentCards
        event_category_id={eventCategoryData[selectedEvent]._id}
        events={eventCategoryData[selectedEvent].events}
        card_details={["volume", "yes", "no"]}
      />
    </motion.div>
  );
}

export default Home;

export async function getStaticProps(context) {
  // const res = await fetch(`${server}/api/event_categories`);
  // const data = await res.json();

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // return {
  //   props: {
  //     eventCategoryData: data.message,
  //   }, // will be passed to the page component as props
  // };
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let event_categories = await db
      .collection("event_categories")
      .find({})
      .toArray();

    return {
      props: {
        eventCategoryData: JSON.parse(JSON.stringify(event_categories)),
      },
    };
  } catch (error) {
    // return the error
    throw new Error(error);
  }
}
