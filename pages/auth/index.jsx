import React, { useState } from "react";
import styles from "./login.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={16} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfmPassword, setCnfmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [openNotif, setOpenNotif] = useState(false);

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

  // const { data: session } = useSession();
  const router = useRouter();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
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
        router.replace("/");
      } else {
        handleNotification(result.error, "error");
      }
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   router.replace("/");
    // }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (password !== cnfmPassword) {
      handleNotification("Password don't match!", "error");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.status !== 201) {
        throw new Error(json.message || "Something went wrong");
      }

      // handleModeChange("signin");
      setStatesToDefault();
      setMode("signin");
      console.log(json.message);
      handleNotification(json.message, "success");
      // router.replace("/auth");
    } catch (error) {
      handleNotification(error.message, "error");
      console.log(error);
    }
  };

  const setStatesToDefault = () => {
    setUsername("");
    setPassword("");
    setCnfmPassword("");
    setEmail("");
    setMsg("");
  };

  const handleModeChange = (desiredMode) => (e) => {
    // console.log(desiredMode);
    setMode(desiredMode);
    setStatesToDefault();
  };

  return (
    <div
      className={`${styles.container} ${
        mode === "signup" && styles.sign_up_mode
      }`}
    >
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
          <form
            onSubmit={handleSignInSubmit}
            className={`${styles.sign_in_form} ${styles.form}`}
          >
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles.input_field}>
              <PersonIcon className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div className={styles.forgotPwd}>
              <Link href="#">Forgot your Password?</Link>
            </div>
            {/* <span className={styles.error}>{error}</span> */}
            <button
              type="submit"
              className={styles.btn}
              style={{ fontWeight: "600" }}
            >
              Login
            </button>
            <p className={styles.social_text}>
              Or Sign in with social platforms
            </p>
            <div className={styles.social_media}>
              <div className={styles.social_icon}>
                <Link href="#">
                  <FacebookIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <TwitterIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <GoogleIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <LinkedInIcon className={styles.social_svg} />
                </Link>
              </div>
            </div>
          </form>
          <form
            onSubmit={handleSignUpSubmit}
            className={`${styles.sign_up_form} ${styles.form}`}
          >
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.input_field}>
              <PersonIcon className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.input_field}>
              <EmailIcon className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <div className={styles.input_field}>
              <LockIcon className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                value={cnfmPassword}
                name="confirm_password"
                onChange={(e) => setCnfmPassword(e.target.value)}
              />
            </div>
            {/* <span className={styles.error}>{error}</span> */}
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
            <p className={styles.social_text}>
              Or Sign up with social platforms
            </p>
            <div className={styles.social_media}>
              <div className={styles.social_icon}>
                <Link href="#">
                  <FacebookIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <TwitterIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <GoogleIcon className={styles.social_svg} />
                </Link>
              </div>
              <div className={styles.social_icon}>
                <Link href="#">
                  <LinkedInIcon className={styles.social_svg} />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.panels_container}>
        <div className={`${styles.panel} ${styles.left_panel}`}>
          <div className={styles.content}>
            <h3>New here ?</h3>
            {/* <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p> */}
            <button
              className={`${styles.btn} ${styles.transparent}`}
              id="sign-up-btn"
              onClick={handleModeChange("signup")}
            >
              Sign up
            </button>
          </div>
          {/* <img src="img/log.svg" className="image" alt="" /> */}
        </div>
        <div className={`${styles.panel} ${styles.right_panel}`}>
          <div className={styles.content}>
            <h3>One of us ?</h3>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p> */}
            <button
              className={`${styles.btn} ${styles.transparent}`}
              id="sign-in-btn"
              onClick={handleModeChange("signin")}
            >
              Sign in
            </button>
          </div>
          {/* <img src="img/register.svg" className="image" alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Login;
