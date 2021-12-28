import React, { useState, useEffect } from "react";
import styles from "./auth.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getSession,
  signIn,
  getProviders,
  getCsrfToken,
} from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={16} ref={ref} variant="filled" {...props} />;
});

function Auth({ providers, csrfToken }) {
  // console.log(csrfToken, "csrfToken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [openNotif, setOpenNotif] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      if (router.query.error === "OAuthAccountNotLinked") {
        handleNotification(
          "Please use the original way to sign in which you used for the first time",
          "error"
        );
        return router.push("/auth");
      }
      handleNotification(router.query.error, "error");
      return router.push("/auth");
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotif(false);
  };

  const handleNotification = (message, type) => {
    setMsg(message);
    setSeverity(type);
    setOpenNotif(true);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length < 7) {
      handleNotification(
        "Invalid Email Format or Password less than 7 characters",
        "error"
      );
      return;
    }

    // if (!session) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      console.log(result);

      if (!result.error) {
        setStatesToDefault();
        // router.replace("/");
      } else {
        if (result.error === "Error: Success! Check your email.") {
          signIn("email", { email: email });
          handleNotification("Success! Check your email.", "success");
        } else {
          handleNotification(result.error, "error");
        }
      }
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   router.replace("/");
    // }
  };

  // const handleSignUpSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== cnfmPassword) {
  //     handleNotification("Password don't match!", "error");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username,
  //         email: email,
  //         password: password,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const json = await response.json();

  //     if (response.status !== 201) {
  //       throw new Error(json.message || "Something went wrong");
  //     }

  //     // handleModeChange("signin");
  //     setStatesToDefault();
  //     setMode("signin");
  //     console.log(json.message);
  //     handleNotification(json.message, "success");
  //     // router.replace("/auth");
  //   } catch (error) {
  //     handleNotification(error.message, "error");
  //     console.log(error);
  //   }
  // };

  const setStatesToDefault = () => {
    // setUsername("");
    setPassword("");
    // setCnfmPassword("");
    setEmail("");
    setMsg("");
  };

  // const handleModeChange = (desiredMode) => (e) => {
  //   // console.log(desiredMode);
  //   setMode(desiredMode);
  //   setStatesToDefault();
  // };

  return (
    <div className={styles.container}>
      <Snackbar
        open={openNotif}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%", fontSize: "16px" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <div className={styles.forms_container}>
        <div className={styles.signin_signup}>
          <h2 className={styles.title}>Sign in</h2>
          <form
            onSubmit={handleSignInSubmit}
            className={`${styles.sign_in_form} ${styles.form}`}
          >
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div className={styles.input_field}>
              <PersonIcon className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_field}>
              <LockIcon className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.forgotPwd}>
              <Link href="#">Forgot your Password?</Link>
            </div>

            <button
              type="submit"
              className={styles.btn}
              style={{ fontWeight: "600" }}
            >
              Login
            </button>
          </form>
          <p className={styles.social_text}>Or Sign in with social platforms</p>
          <div className={styles.social_media}>
            <div
              className={styles.social_icon}
              key={providers.name}
              onClick={() => signIn(providers.google.id)}
            >
              <GoogleIcon className={styles.social_svg} />
            </div>
            <div
              className={styles.social_icon}
              key={providers.name}
              onClick={() => signIn(providers.facebook.id)}
            >
              <FacebookIcon className={styles.social_svg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  console.log("/auth", session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { providers, csrfToken },
  };
}

export default Auth;
