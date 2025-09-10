import styles from './Navbar.module.css'
import TokenSearch from "../../features/token-search";
import MenuIcon from "../../shared/assets/icons/MenuIcon";

const Navbar = () => {
   return (
      <header className={styles.wrapper}>
         <div className={styles.logoWrapper}>
            <span>QO</span>
         </div>

         <div className={styles.searchWrapper}>
            <TokenSearch />
         </div>

         <button className={styles.menuButton}>
            <MenuIcon />
         </button>
      </header>
   );
};

export default Navbar;