import constants from '../../utils/constants';
import classes from './Navbar.module.css';
const NavBar = () => {
  return (
    <div className={classes.topHeader}>
      <header className={classes.header}>
        <img
          className={classes.img}
          alt={constants.logoAlt}
          src={constants.logoUrl}
        ></img>
      </header>
    </div>
  );
};

export default NavBar;
