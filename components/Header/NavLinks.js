import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Link from "next/link";
import headerStyles from "./Header.module.css";
function NavLinks({ isMobile, open }) {
  return (
    <ul className={`${isMobile && open && headerStyles.navlinks_active}`}>
      <li>
        <div>
          <Link href="/positions">Positions</Link>
        </div>
      </li>
      <li>
        <div>
          <Link href="/funds">Funds</Link>
        </div>
      </li>
      <li>
        <div>
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
