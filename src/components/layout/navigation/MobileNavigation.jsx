import { useState } from "react";
import classes from "./MobileNavigation.module.scss";

const mobileNav = [
  {
    name: "Home",
    id: "section-hero",
  },
  {
    name: "Services",
    id: "section-services",
  },
  {
    name: "Solution",
    id: "section-solution",
  },
  {
    name: "Steps",
    id: "section-steps",
  },
  {
    name: "Contacts",
    id: "section-contacts",
  },
];

const MobileNavigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const mobileMenuHandler = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const navHandler = (e) => {
    e.preventDefault();
    const link = e.target.closest(`.${classes["mobile-nav__link"]}`);
    setMenuIsOpen(false);

    if (!link) {
      return;
    }
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
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
          {mobileNav.map((nav) => {
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
