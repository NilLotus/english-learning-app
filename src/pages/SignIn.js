import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import useInput from "../hooks/useInput";
import AuthContext from "../store/Auth-context";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import classes from "./SignIn.module.css";

const SignInPage = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const search = history.location.search;
  const prevPath = new URLSearchParams(search).get("path");

  const [notification, setNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailCondition = (val) => {
    return val.includes("@");
  };
  const passwordCondition = (val) => {
    return val.trim().length > 6;
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
    inputValue: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: resetPasswordInput,
    turnOnIsTouched: turnOnPasswordIsTouched,
  } = useInput({
    condition: passwordCondition,
  });

  const formIsValid = emailIsValid && passwordIsValid;

  const sendRequest = async () => {
    setNotification(false);
    let apiKey = "AIzaSyBhY_MRaXZTIX3CnorfD9Ru4Hrod60n4xU";
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
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
    console.log({ data });
    if (data["error"] && data["error"]["message"]) {
      setNotification(true);
      setErrorMessage(data.error.message);
      throw new Error(data.error.message);
    } else {
      authCtx.login(data.idToken, data.email);
    }
  };

  const closeModalHandler = () => {
    setNotification(false);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      turnOnEmailIsTouched();
      turnOnPasswordIsTouched();
      changeShowError(true);
      return;
    } else {
      changeShowError(false);
    }
    await sendRequest();

    resetEmailInput();
    resetPasswordInput();

    history.push(prevPath);
  };
  return (
    <div className={classes["signing-page"]}>
      <Card className={classes["sign-in"]}>
        <h2 className={classes.title}>Sign-In</h2>
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
            error="This email is not registered!"
          />
          <Input
            id={password}
            label="Enter Your Password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            showError={showError}
            hasError={passwordHasError}
            error="Your password is not correct!"
          />
          <button className={classes.submit}>Sign In</button>
        </form>
      </Card>
      <div className={classes.toggleForm}>
        <fieldset>
          <legend>New User?</legend>
        </fieldset>
        <Link className={classes.toggleLink} to="/sign-up">
          Sign up
        </Link>
      </div>
      {notification && (
        <Modal
          title="Error"
          message={errorMessage}
          onClick={closeModalHandler}
        />
      )}
    </div>
  );
};
export default SignInPage;
