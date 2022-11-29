import { useState } from "react";

const useInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const hasError = !isValid && isTouched;
  const [showError, setShowError] = useState(false);

  const inputChangeHandler = (event) => {
    const currentValue = event.target.value;
    setIsTouched(false);
    setInputValue(currentValue);
    props.secondCondition && props.secondCondition(currentValue);
    if (props.condition(currentValue)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
    setShowError(true);
  };
  const resetInput = () => {
    setInputValue("");
    setIsTouched(false);
  };
  const turnOnIsTouched = () => {
    setIsTouched(true);
  };
  const changeIsValid = (val) => {
    setIsValid(val);
  };
  const changeShowError = (val) => {
    setShowError(val);
  };
  return {
    inputValue,
    isValid,
    hasError,
    showError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
    turnOnIsTouched,
    changeIsValid,
    changeShowError,
  };
};
export default useInput;
