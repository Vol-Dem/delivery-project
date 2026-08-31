import Checkbox from "../../../ui/forms/Checkbox";
import LinkA from "../../../ui/LinkA";
import classes from "./TermsPrivacyField.module.scss";

const TermsPrivacyField = ({ checked, onChange }) => {
  return (
    <div className={classes.tos}>
      <Checkbox
        id="agreement"
        name="agreement"
        checked={checked}
        aria-labelledby="agreement-copy"
        onChange={onChange}
      />
      <span id="agreement-copy" className={classes.copy}>
        <label htmlFor="agreement">I have read and agree to the</label>{" "}
        <LinkA href="#" className={classes.link} to="tos" target="blank">
          Terms of Service
        </LinkA>{" "}
        <label htmlFor="agreement">and</label>{" "}
        <LinkA href="#" className={classes.link} to="privacy" target="blank">
          Privacy Policy
        </LinkA>
      </span>
    </div>
  );
};

export default TermsPrivacyField;
