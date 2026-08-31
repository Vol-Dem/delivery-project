const validationRules = {
  email: (value) => {
    const isValid = value.includes("@");

    return {
      isValid,
      errorMessage: isValid ? "" : "Email must includes @",
    };
  },
  password: (value) => {
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

export const validateInput = (type, value) =>
  validationRules[type]?.(value) ?? defaultValidation;
