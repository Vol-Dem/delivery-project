import classes from "./MainNavigation.module.scss";

const MainNavigation = () => {
  const navHandler = (e) => {
    e.preventDefault();
    const link = e.target.closest(`.${classes["nav__link"]}`);
    if (!link) {
      return;
    }
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav onClick={navHandler} className={classes["nav-main"]}>
      <ul className={classes["nav__links"]}>
        <li className={classes["nav__item"]}>
          <a className={classes["nav__link"]} href="#section-hero">
            Home
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a className={classes["nav__link"]} href="#section-services">
            Services
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a className={classes["nav__link"]} href="#section-solution">
            Solution
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a className={classes["nav__link"]} href="#section-steps">
            Steps
          </a>
        </li>
        <li className={classes["nav__item"]}>
          <a className={classes["nav__link"]} href="#section-contacts">
            Contacts
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
