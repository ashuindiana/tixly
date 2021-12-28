import React, { useEffect, useRef, useState } from "react";
import { server } from "../../../config";
import Image from "next/image";
import headerStyles from "../Header.module.css";
import styles from "./profile.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

function ProfileLink() {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  let dropdownMenuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!dropdownMenuRef.current?.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={headerStyles.user_icon}>
      {session ? (
        <div
          ref={dropdownMenuRef}
          className={headerStyles.dropdown}
          onClick={() => setActive(!active)}
        >
          {!session.user.image ? (
            <AccountCircleSharpIcon id={headerStyles.user_avatar} />
          ) : (
            <div className={styles.image}>
              <Image
                src={session.user.image}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div
            className={`${headerStyles.dropdown_menu} ${
              active && headerStyles.active
            }`}
          >
            <div
              className={headerStyles.dropdownItem}
              onClick={() => signOut({ callbackUrl: `${server}/` })}
            >
              Log Out
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          style={{
            border: "1px solid #3F32CE",
            padding: "4px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Sign in
        </div>
      )}
    </div>
  );
}

export default ProfileLink;
