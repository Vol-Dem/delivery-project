export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

type ValidationRule = (value: string) => ValidationResult;

const validationRules: Partial<Record<string, ValidationRule>> = {
  email: (value: string) => {
    const isValid = value.includes("@");

    return {
      isValid,
      errorMessage: isValid ? "" : "Email must includes @",
    };
  },
  password: (value: string) => {
    const isValid = value.length >= 6;

    return {
      isValid,
      errorMessage: isValid ? "" : "Password needs to be 6+ characters",
    };
  },
};

const defaultValidation = {
  isValid: false,
  errorMessage: "",
};

export const validateInput = (type: string, value: string): ValidationResult =>
  validationRules[type]?.(value) ?? defaultValidation;
