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
        label={
          <span>
            I have read and agree to the{" "}
            <LinkA href="#" className={classes.link} to="tos" target="blank">
              Terms of Service
            </LinkA>{" "}
            and{" "}
            <LinkA
              href="#"
              className={classes.link}
              to="privacy"
              target="blank"
            >
              Privacy Policy
            </LinkA>
          </span>
        }
        onChange={onChange}
      />
    </div>
  );
};

export default TermsPrivacyField;
