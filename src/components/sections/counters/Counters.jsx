import classes from "./Counters.module.scss";

const Counters = () => {
  return (
    <section className={classes["counters-sections"]}>
      <div className={classes["counters__container"]}>
        <div className={classes["counters"]}>
          <div className={classes["counter"]}>
            <span className={classes["counter-digits"]}>12+</span>
            years in logistics
          </div>
          <div className={classes["counter"]}>
            <span className={classes["counter-digits"]}>4434</span>
            branches
          </div>
          <div className={classes["counter"]}>
            <span className={classes["counter-digits"]}>5 min</span>
            to send a parcel
          </div>
          <div className={classes["counter"]}>
            <span className={classes["counter-digits"]}>1230</span>
            online stores
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counters;
