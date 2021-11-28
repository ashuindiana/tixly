import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import styles from "./MobileNavigation.module.css";
import headerStyles from "../Header.module.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(1502px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 60,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MobileNavigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`${styles.main_nav} ${headerStyles.mobile_menu_link}`}
      variants={sidebar}
    >
      <motion.div className={`${styles.background} `} variants={sidebar} />
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
