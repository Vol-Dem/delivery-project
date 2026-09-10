import { useState } from "react";
import classes from "./MobileNavigation.module.scss";
import navigationItems from "./navigation-items";

const MobileNavigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const mobileMenuHandler = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const navHandler = () => {
    setMenuIsOpen(false);
  };
  return (
    <div
      className={`${classes["mobile-nav"]} ${
        menuIsOpen ? classes["mobile-nav--open"] : ""
      }`}
    >
      <button
        className={classes["mobile-nav__btn"]}
        onClick={mobileMenuHandler}
        title="Menu"
      >
        <span className={classes["mobile-nav__btn-icon"]}></span>
      </button>
      <nav onClick={navHandler} className={`${classes["mobile-nav__nav"]}`}>
        <ul className={classes["mobile-nav__links"]}>
          {navigationItems.map((nav) => {
            return (
              <li key={nav.id} className={classes["mobile-nav__item"]}>
                <a className={classes["mobile-nav__link"]} href={`#${nav.id}`}>
                  {nav.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
