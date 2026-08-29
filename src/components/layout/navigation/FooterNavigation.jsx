import classes from "./FooterNavigation.module.scss";

const footerNav = [
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

const FooterNavigation = () => {
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
        {footerNav.map((nav, i) => {
          return (
            <li key={i} className={classes["nav__item"]}>
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

export default FooterNavigation;
