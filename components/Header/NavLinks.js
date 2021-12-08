import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Link from "next/link";
import { useState } from "react";
import headerStyles from "./Header.module.css";
import { useRouter } from "next/router";

function NavLinks() {
  const [curPath, setCurPath] = useState("");
  let { asPath } = useRouter();
  asPath = asPath.slice(1);

  // if (asPath.includes("positions")) {
  //   setCurPath("positions");
  // } else if (asPath.includes("funds")) {
  //   setCurPath("funds");
  // } else if (asPath.includes("referrals")) {
  //   setCurPath("referrals");
  // } else {
  //   setCurPath("");
  // }
  const handlePath = () => {
    console.log(curPath, asPath);
  };
  return (
    <ul>
      <li>
        <div
          onClick={handlePath}
          style={{
            color: `${asPath.includes("positions") && "#3E32CD"}`,
            fontWeight: `${asPath.includes("positions") && "700"}`,
            fontSize: "1.7rem",
          }}
        >
          <Link href="/positions">Positions</Link>
        </div>
      </li>
      <li>
        <div
          onClick={handlePath}
          style={{
            color: `${asPath.includes("funds") && "#3E32CD"}`,
            fontWeight: `${asPath.includes("funds") && "700"}`,
            fontSize: "1.7rem",
          }}
        >
          <Link href="/funds">Funds</Link>
        </div>
      </li>
      <li>
        <div
          onClick={handlePath}
          style={{
            color: `${asPath.includes("referrals") && "#3E32CD"}`,
            fontWeight: `${asPath.includes("referrals") && "700"}`,
            fontSize: "1.7rem",
          }}
        >
          <Link href="/referrals">Referrals</Link>
        </div>
      </li>
      <li>
        <div className={headerStyles.user_icon}>
          <AccountCircleSharpIcon id={headerStyles.user_avatar} />
        </div>
      </li>
    </ul>
  );
}

export default NavLinks;
