import React, { useContext } from "react";
import styles from "./common.module.css";
import Link from "next/link";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <div className={styles.BoxContainer}>
      <form className={styles.FormContainer}>
        <input className={styles.Input} type="email" placeholder="Email" />
        <input
          className={styles.Input}
          type="password"
          placeholder="Password"
        />
      </form>
      <span style={{ display: "flex", marginTop: "10px" }}></span>
      <div className={styles.Link}>
        <Link href="#">Forget your password?</Link>
      </div>
      <span style={{ display: "flex", marginTop: "1.6em" }}></span>
      <button className={styles.SubmitButton} type="submit">
        SignIn
      </button>
      <span style={{ display: "flex", marginTop: "1em" }}></span>
      <div className={styles.Link}>
        <>
          Don't have an account?{" "}
          <div className={styles.BoldLink} onClick={switchToSignup}>
            <Link href="#">Signup</Link>
          </div>
        </>
      </div>
    </div>
  );
}
