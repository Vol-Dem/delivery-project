import { useCallback, useState } from "react";
import { validateInput } from "../forms/validation";

/**
 * Validate input data
 * @param {string} type - Type of validation (email or password)
 * @returns {Array} - Returns array with a state object {inputValue,isValid,errorMessage}, and a function to pass value.
 */
export const useValidation = (type) => {
  const [inputValue, setInputValue] = useState("");
  const validation = validateInput(type, inputValue);

  const validate = useCallback((value) => {
    setInputValue(value);
  }, []);

  return [{ inputValue, ...validation }, validate];
};
