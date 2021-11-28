import NavLinks from "./NavLinks";
import headerStyles from "./Header.module.css";

function Navigation() {
    return (
        <div className={headerStyles.menu_link}>
            <NavLinks />
        </div>
    )
}

export default Navigation
