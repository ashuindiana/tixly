import React, { useContext } from "react";
import styles from "./common.module.css";
import Link from "next/link";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <div className={styles.BoxContainer}>
      <form className={styles.FormContainer}>
        <input className={styles.Input} type="text" placeholder="Full Name" />
        <input className={styles.Input} type="email" placeholder="Email" />
        <input
          className={styles.Input}
          type="password"
          placeholder="Password"
        />
        <input
          className={styles.Input}
          type="password"
          placeholder="Confirm Password"
        />
      </form>
      <span style={{ display: "flex", marginTop: "10px" }}></span>
      <button className={styles.SubmitButton} type="submit">
        SignUp
      </button>
      <span style={{ display: "flex", marginTop: "1em" }}></span>
      <div className={styles.Link}>
        <>
          Already have an account?
          <div className={styles.BoldLink} onClick={switchToSignin}>
            <Link href="#">SignIn</Link>
          </div>
        </>
      </div>
    </div>
  );
}
