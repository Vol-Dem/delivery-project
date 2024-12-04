import { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import { ReactComponent as LogoImg } from "./../../../assets/logo.svg";
import MainNavigation from "../navigation/MainNavigation";
import MobileNavigation from "../navigation/MobileNavigation";

import React from "react";

const stickyNav = () => {
  return <div>Header</div>;
};

const Header = () => {
  const [sticky, setSticky] = useState(false);

  const stickyMenu = () => {
    const scrollTop = window.scrollY;
    const isSticky = scrollTop > 700;
    setSticky(isSticky);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyMenu);
    window.addEventListener("load", stickyMenu);
    return () => {
      window.removeEventListener("scroll", stickyMenu);
    };
  }, []);
  return (
    <header
      className={`${classes.header} ${sticky ? classes["header--sticky"] : ""}`}
    >
      <div className={classes.logo}>
        <LogoImg className={classes["logo__img"]} /> UNSTO-EXPRESS
      </div>
      <MainNavigation />
      <MobileNavigation />
    </header>
  );
};

export default Header;
