import headerStyles from "./Header.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Link  from 'next/link';
import Navigation from "./Navigation";
import { MobileNavigation } from "./FramerMobileNav/MobileNavigation";

function Header() {
  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.main_nav}>
        {/* 1st logo part  */}
        <div className={headerStyles.logo}>
          <h2>
            <Link href="/">Tixly</Link>
          </h2>
        </div>
        
        {/* 2nd search Bar */}
        <div className={headerStyles.search_icon}>
            <input type="search" placeholder="Search events.."></input>
            <label className={headerStyles.icon}>
              <SearchIcon id={headerStyles.search_icon_avatar}/>
            </label>
        </div>

        {/* 3rd menu part  */}
        <div className={headerStyles.toggle_link}>
          
          <Navigation />
          {/* <MobileNavigation /> */}
          <MobileNavigation />
        </div>
        
      </nav>
    </div>
  );
}

export default Header;
