import { motion } from "framer-motion";
import Switcher from "../../components/EventComponentSwitcher/Switcher";
import Header from "../../components/Header/Header";
import { dbConnect } from "../../utils/dbConnect";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Positions({ live_data, past_data }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      return router.push("/auth");
    }
  }, []);
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
        {status === "authenticated" ? (
          <Switcher live_data={live_data} past_data={past_data} />
        ) : (
          <h2
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginTop: "12rem",
            }}
          >
            Not Authenticated, Redirecting to Login Page
          </h2>
        )}
      </div>
    </motion.div>
  );
}

export default Positions;

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
