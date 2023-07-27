import Button from "../../../ui/Button";
import Titles from "../../../ui/Titles";
import classes from "./Cta.module.scss";

const Cta = () => {
  return (
    <section className={classes["cta-sections"]}>
      <div className={classes["cta__container"]}>
        <div>
          <Titles main="Need to send parcels regularly? Create an account" />
          <p className={classes["cta__text"]}>
            Send goods quickly, easily and conveniently without restrictions
          </p>
        </div>
        <Button>Sign up!</Button>
      </div>
    </section>
  );
};

export default Cta;
