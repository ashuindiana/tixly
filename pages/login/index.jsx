import React, { useState } from "react";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";
import styles from "./login.module.css";
import { useMediaQuery } from "../../utils/mediaQueryHook";

const expandingTransition = {
  type: "spring",
  duration: 2,
  stiffness: 50,
};

export default function AccountBox(props) {
  const isAboveTablet = useMediaQuery("(min-width: 425px)");
  const isAboveLargeLaptop = useMediaQuery("(min-width: 1025px)");

  const responsiveCollapsedCss = {
    isBelowTablet: {
      width: "160%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
    isAboveTablet: {
      width: "292%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(155deg)",
    },
    isAboveLargeLaptop: {
      width: "243%",
      height: "550px",
      borderRadius: "50%",
      transform: "rotate(158deg)",
    },
  };

  const responsiveExpandedCss = {
    isBelowTablet: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    isAboveTablet: {
      width: "233%",
      height: "2050px",
      borderRadius: "20%",
      transform: "rotate(143deg)",
    },
    isAboveLargeLaptop: {
      width: "233%",
      height: "2050px",
      borderRadius: "20%",
      transform: "rotate(158deg)",
    },
  };

  const backdropVariants = {
    expanded: isAboveLargeLaptop
      ? responsiveExpandedCss.isAboveLargeLaptop
      : isAboveTablet
      ? responsiveExpandedCss.isAboveTablet
      : responsiveExpandedCss.isBelowTablet,

    collapsed: isAboveLargeLaptop
      ? responsiveCollapsedCss.isAboveLargeLaptop
      : isAboveTablet
      ? responsiveCollapsedCss.isAboveTablet
      : responsiveCollapsedCss.isBelowTablet,
  };

  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div
        style={{
          //   minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "0 5%",
          alignItems: "center",
        }}
      >
        <div className={styles.BoxContainer}>
          <div className={styles.TopContainer}>
            <motion.div
              className={styles.BackDrop}
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <div className={styles.HeaderContainer}>
                <h2 className={styles.HeaderText}>Welcome</h2>
                <h2 className={styles.HeaderText}>Back</h2>
                <h5 className={styles.SmallText}>
                  Please sign-in to continue!
                </h5>
              </div>
            )}
            {active === "signup" && (
              <div className={styles.HeaderContainer}>
                <h2 className={styles.HeaderText}>Create</h2>
                <h2 className={styles.HeaderText}>Account</h2>
                <h5 className={styles.SmallText}>
                  Please sign-up to continue!
                </h5>
              </div>
            )}
          </div>
          <div className={styles.InnerContainer}>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
          </div>
        </div>
      </div>
    </AccountContext.Provider>
  );
}
