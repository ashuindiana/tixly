import headerStyles from "./Header.module.css";
import NavLinks from "./NavLinks";
import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function MobileNavigation() {
    const [open, setOpen ] = useState(false);
    return (
        <div className={headerStyles.mobile_menu_link}>
            {!open &&
                // <CloseIcon className={headerStyles.hamburger_toggle_icon}
                //     onClick={()=> setOpen(!open)}
                // /> :
                <MenuIcon className={headerStyles.hamburger_toggle_icon}
                    onClick={()=> setOpen(!open)}
                />
            }
            
            <NavLinks isMobile={true} open={open}/> 
            <div className={`${open && headerStyles.nav_overlay_active } ${headerStyles.nav_overlay}`}
                onClick={()=> setOpen(false)}
            ></div>
        </div>
    )
}

export default MobileNavigation
