import Button from "../../../ui/Button";
import Input from "../../../ui/forms/Input";
import TermsPrivacyField from "../../forms/ui/TermsPrivacyField";
import classes from "./Calculator.module.scss";

const QuoteRequestForm = ({
  onSubmit,
  onEmailBlur,
  onEmailChange,
  emailError,
}) => (
  <>
    <h3 className={classes["calculator__form-title"]}>
      Fill out the form to get a quote
    </h3>
    <form className={classes["calculator__form"]} onSubmit={onSubmit}>
      <Input
        type="email"
        placeholder="Email"
        onBlur={onEmailBlur}
        error={emailError}
        autoFocus={true}
        onChange={onEmailChange}
      />
      <TermsPrivacyField />
      <Button type="submit">Get a quote</Button>
    </form>
  </>
);

export default QuoteRequestForm;
