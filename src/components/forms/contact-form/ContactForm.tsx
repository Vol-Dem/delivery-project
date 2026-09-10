import classes from "./ContactForm.module.scss";
import Button from "../../../ui/Button";
import Input from "../../../ui/forms/Input";
import TermsPrivacyField from "../ui/TermsPrivacyField";

const ContactForm = () => {
  return (
    <div>
      <form className={classes["contact-form"]}>
        <h3 className={classes["contact-form__title"]}>Get a call back</h3>
        <Input
          type="text"
          placeholder="Name"
          className={classes["contact-form__input"]}
          autoFocus={true}
        />
        <Input
          type="text"
          placeholder="Phone"
          className={classes["contact-form__input"]}
        />
        <TermsPrivacyField />
        <Button className={classes["contact-form__btn"]}>Call Me</Button>
      </form>
    </div>
  );
};

export default ContactForm;
