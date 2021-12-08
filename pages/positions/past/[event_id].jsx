import React from "react";
import styles from "../../../styles/positionEvent.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { dbConnect } from "../../../utils/dbConnect";
import Card from "../../../components/ContentCards/Card";
import Header from "../../../components/Header/Header";
const ObjectId = require("mongodb").ObjectId;

function PositionEvent({ data }) {
  const card_details = ["trades", "investment", "returns"];
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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // padding: "0 5%",
      }}
    >
      <Header noSearch />
      <div
        style={{ padding: "0 5%", display: "flex", flexDirection: "column" }}
      >
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <Card data={data} card_details={card_details} noLink={true} />
          </div>
          <div className={styles.lower}>
            <h3>Trades</h3>
            <div className={styles.card}>
              <div className={styles.card_header}>
                <div className={styles.card_title}>No</div>

                <div className={styles.card_status}>SETTLED</div>
              </div>
              <div className={styles.details}>
                <div className={styles.detail_item}>1 x ₹ 2</div>
                <div className={styles.detail_item}>Aug, 03, 2021, 4:30pm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const getStaticProps = async (context) => {
  try {
    let { db } = await dbConnect();
    // fetch the posts
    let pastEvent = await db
      .collection("pastEvents_data")
      .find({ _id: ObjectId(context.params.event_id) })
      .toArray();

    return {
      props: {
        data: JSON.parse(JSON.stringify(pastEvent[0])),
      },
      revalidate: 1,
    };
  } catch (error) {
    // return the error
    throw new Error(error);
  }
};

export const getStaticPaths = async () => {
  try {
    // connect to the database
    let { db } = await dbConnect();
    // fetch the posts
    let event_categories = await db
      .collection("pastEvents_data")
      .find({})
      .toArray();

    const data = JSON.parse(JSON.stringify(event_categories));

    const paths = data.map((item) => ({
      params: {
        event_id: item._id.toString(),
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    // return the error
    throw new Error(error);
  }
};

export default PositionEvent;
