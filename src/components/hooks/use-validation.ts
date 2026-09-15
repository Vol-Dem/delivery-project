import { useCallback, useState } from "react";
import { validateInput } from "../forms/validation";

/**
 * Tracks an input value and derives the result of its named validation rule.
 *
 * @returns The current input and validation state followed by a stable updater.
 */
export const useValidation = (type: string) => {
  const [inputValue, setInputValue] = useState("");
  const validation = validateInput(type, inputValue);

  const validate = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return [{ inputValue, ...validation }, validate] as const;
};
