import classes from "./MainNavigation.module.scss";
import navigationItems from "./navigation-items";

const MainNavigation = () => {
  return (
    <nav className={classes["nav-main"]}>
      <ul className={classes["nav__links"]}>
        {navigationItems.map((nav) => {
          return (
            <li key={nav.id} className={classes["nav__item"]}>
              <a className={classes["nav__link"]} href={`#${nav.id}`}>
                {nav.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNavigation;
