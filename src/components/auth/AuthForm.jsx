import Button from "../../ui/Button";
import Input from "../../ui/Input";
import classes from "./AuthForm.module.scss";

const AuthForm = () => {
  return (
    <div>
      <form className={classes.auth}>
        <h3 className={classes["auth__title"]}>Login</h3>
        <Input
          type="text"
          placeholder="Email"
          className={classes["auth__input"]}
          autoFocus={true}
        />
        <Input
          type="text"
          placeholder="Password"
          className={classes["auth__input"]}
        />

        <Button className={classes["auth__btn"]}>Log in</Button>
      </form>
    </div>
  );
};

export default AuthForm;
