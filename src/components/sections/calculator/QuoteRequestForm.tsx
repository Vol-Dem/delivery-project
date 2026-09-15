import type { FormEventHandler } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/forms/Input";
import TermsPrivacyField from "../../forms/ui/TermsPrivacyField";
import classes from "./Calculator.module.scss";

interface QuoteRequestFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onEmailBlur: (value: string) => void;
  onEmailChange: (value: string) => void;
  emailError: string | false;
}

const QuoteRequestForm = ({
  onSubmit,
  onEmailBlur,
  onEmailChange,
  emailError,
}: QuoteRequestFormProps) => (
  <>
    <h2 className={classes["calculator__form-title"]}>
      Fill out the form to get a quote
    </h2>
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
