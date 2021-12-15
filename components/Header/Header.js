import headerStyles from "./Header.module.css";
import Link from "next/link";
import Navigation from "./Navigation";
import { MobileNavigation } from "./FramerMobileNav/MobileNavigation";
import SearchBar from "../SearchBar/SearchBar";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import ProfileLink from "./ProfileLink";

function Header({ eventCategoryData, noSearch }) {
  // console.log(eventCategoryData);
  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.main_nav}>
        {/* 1st logo part  */}
        <div className={headerStyles.logo}>
          <h2>
            <Link href="/">
              <span
                style={{ fontFamily: '"Neuton", serif', cursor: "pointer" }}
              >
                {" "}
                Tixly
              </span>
            </Link>
          </h2>
        </div>

        {/* 2nd search Bar */}
        <div className={headerStyles.search_wrapper}>
          <SearchBar
            data={eventCategoryData}
            placeholder="Search Events.."
            noSearch={noSearch}
          />
          {/* <input type="search" placeholder="Search events.."></input>
          <label className={headerStyles.icon}>
            <SearchIcon id={headerStyles.search_icon_avatar} />
          </label> */}
        </div>

        {/* 3rd menu part  */}
        <div className={headerStyles.toggle_link}>
          <Navigation />
          {/* <MobileNavigation /> */}
          <MobileNavigation />
        </div>

        <div className={headerStyles.profile_wrapper}>
          <ProfileLink />
        </div>
      </nav>
    </div>
  );
}

export default Header;
