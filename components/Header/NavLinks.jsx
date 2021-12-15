import Link from "next/link";

import { useRouter } from "next/router";
import ProfileLink from "./ProfileLink";

function NavLinks() {
  const router = useRouter();
  const asPath = router.asPath.slice(1);

  // console.log(session);
  return (
    <ul>
      <li>
        <div
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
        <ProfileLink />
      </li>
    </ul>
  );
}

export default NavLinks;
