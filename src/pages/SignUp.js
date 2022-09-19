import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";

import useInput from "../hooks/useInput";
import AuthContext from "../store/Auth-context";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./SignUp.module.css";
import Modal from "../UI/Modal";

const SignUpPage = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [notification, setNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailCondition = (val) => {
    return val.includes("@");
  };
  const passwordCondition = (val) => {
    return val.trim().length > 6;
  };
  const duplicateCondition = (val) => {
    return val === password;
  };

  const {
    inputValue: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    showError,
    changeShowError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailInput,
    turnOnIsTouched: turnOnEmailIsTouched,
  } = useInput({ condition: emailCondition });

  const {
    inputValue: duplicate,
    isValid: duplicateIsValid,
    hasError: duplicateHasError,
    inputChangeHandler: duplicateChangeHandler,
    inputBlurHandler: duplicateBlurHandler,
    resetInput: resetDuplicateInput,
    turnOnIsTouched: turnOnDuplicateIsTouched,
    changeIsValid: changeDuplicateIsValid,
  } = useInput({ condition: duplicateCondition });

  const passSecondCondition = (val, x = duplicate) => {
    if (val !== x) {
      changeDuplicateIsValid(false);
      changeShowError(true);
    } else {
      changeDuplicateIsValid(true);
      changeShowError(true);
    }
  };

  const {
    inputValue: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: resetPasswordInput,
    turnOnIsTouched: turnOnPasswordIsTouched,
  } = useInput({
    condition: passwordCondition,
    secondCondition: passSecondCondition,
  });

  const formIsValid =
     emailIsValid && passwordIsValid && duplicateIsValid;

  const sendRequest = async () => {
    setNotification(false);
    let apiKey = "AIzaSyD0iWDZ1ABlsuooDbitUTmj93_GWg8CRyA";
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data["error"] && data["error"]["message"]) {
        setNotification(true);
        setErrorMessage(data.error.message);
        throw new Error(data.error.message)
    } else {
      authCtx.signUp(data.idToken,data.email);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      turnOnEmailIsTouched();
      turnOnPasswordIsTouched();
      turnOnDuplicateIsTouched();
      changeShowError(true);
      return;
    } else {
      changeShowError(false);
    }
    await sendRequest();
    resetEmailInput();
    resetPasswordInput();
    resetDuplicateInput();
    history.push('/');
  };

  const closeModalHandler = () =>{
    setNotification(false);
  }

  return (
    <div className={classes["signing-page"]}>
      <Card className={classes["sign-up"]}>
        <h2 className={classes.title}>Sign-Up</h2>
        <form onSubmit={formSubmitHandler}>
          <Input
            id={email}
            label="Your E-mail"
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            showError={showError}
            hasError={emailHasError}
            error="Your email address is not valid!"
          />
          <Input
            id={password}
            label="Set Your Password (7 characters minimum)"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            showError={showError}
            hasError={passwordHasError}
            error="Your password must have at least 7 characters!"
          />
          <Input
            id={duplicate}
            label="Repeat your password"
            type="password"
            value={duplicate}
            onChange={duplicateChangeHandler}
            onBlur={duplicateBlurHandler}
            showError={showError}
            hasError={duplicateHasError}
            error="Your passwords are different!"
          />
          <button className={classes.submit}>Sign Up</button>
        </form>
      </Card>
      <div className={classes.toggleForm}>
        <fieldset>
          <legend>Do you already have an account?</legend>
        </fieldset>
        <Link className={classes.toggleLink} to='/sign-in' >Loging on your account</Link>
      </div>
      {notification && <Modal title='Error' message={errorMessage} onClick={closeModalHandler} />}
    </div>
  );
};
export default SignUpPage;
