import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    
      <footer className={styles.footer}>
        <div className={styles.left}>
            <div className={styles.footer_items}>About | </div>
            <div className={styles.footer_items}>Contact | </div>
            <div className={styles.footer_items}>Privacy | </div>
            <div className={styles.footer_items}>Terms | </div>
            <div className={styles.footer_items}>How It works | </div>
            <div className={styles.footer_items}>FAQ | </div>
            <div className={styles.footer_items}>Blog | </div>
        </div>
        {/* <div className={styles.fake_div}></div> */}
        <div className={styles.right}>
            <div className={styles.footer_items}>Facebook | </div>
            <div className={styles.footer_items}>Twitter | </div>
            <div className={styles.footer_items}>Instagram</div>
        </div>
      </footer>
  );
}

export default Footer;
