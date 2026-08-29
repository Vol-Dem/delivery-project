import Button from "../../../ui/Button";
import Input from "../../../ui/forms/Input";
import classes from "./AuthForm.module.scss";
import { useValidation } from "../../hooks/use-validation";
import { useState } from "react";

const AuthForm = () => {
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [emailState, validateEmail] = useValidation("email");
  const {
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    // inputValue: email,
  } = emailState;

  const [passwordState, validatePassword] = useValidation("password");
  const {
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
    // inputValue: password,
  } = passwordState;

  const validateEmailOnChange = (value) => {
    validateEmail(value);
  };
  const validatePasswordOnChange = (value) => {
    validatePassword(value);
  };

  const showEmailErrorHandler = (value) => {
    validateEmail(value);
    setShowEmailError(true);
  };
  const showPasswordErrorHandler = (value) => {
    validatePassword(value);
    setShowPasswordError(true);
  };

  const authSubmitHandler = (e) => {
    e.preventDefault();
    setSuccessMessage("Success");
  };

  const authFormHtml = (
    <form className={classes.auth} onSubmit={authSubmitHandler}>
      <h3 className={classes["auth__title"]}>Login</h3>
      <Input
        type="email"
        placeholder="Email"
        className={`${classes["auth__input"]} ${
          showEmailError && !emailIsValid ? classes.invalid : ""
        }`}
        onBlur={showEmailErrorHandler}
        error={showEmailError && emailErrorMessage}
        autoFocus={true}
        onChange={validateEmailOnChange}
      />
      <Input
        type="password"
        placeholder="Password"
        className={`${classes["auth__input"]} ${
          showPasswordError && !passwordIsValid ? classes.invalid : ""
        }`}
        onBlur={showPasswordErrorHandler}
        error={showPasswordError && passwordErrorMessage}
        onChange={validatePasswordOnChange}
      />
      <Button
        type="submit"
        className={classes["auth__btn"]}
        disabled={!emailIsValid || !passwordIsValid}
      >
        Log in
      </Button>
    </form>
  );

  return (
    <div>
      {!successMessage && authFormHtml}
      <div className={classes.success}>{successMessage}</div>
    </div>
  );
};

export default AuthForm;
