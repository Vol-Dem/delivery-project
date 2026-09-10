import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useValidation } from "../hooks/use-validation";
import { validateInput } from "./validation";

describe("validateInput", () => {
  it("applies the email policy", () => {
    expect(validateInput("email", "person@example.com")).toEqual({
      isValid: true,
      errorMessage: "",
    });
    expect(validateInput("email", "person.example.com")).toEqual({
      isValid: false,
      errorMessage: "Email must includes @",
    });
  });

  it("applies the password policy", () => {
    expect(validateInput("password", "secret")).toEqual({
      isValid: true,
      errorMessage: "",
    });
    expect(validateInput("password", "short")).toEqual({
      isValid: false,
      errorMessage: "Password needs to be 6+ characters",
    });
  });

  it("returns a neutral invalid result for an unknown policy", () => {
    expect(validateInput("unknown", "value")).toEqual({
      isValid: false,
      errorMessage: "",
    });
  });
});

describe("useValidation", () => {
  it("derives the validation result from its current value", () => {
    const { result } = renderHook(() => useValidation("email"));

    act(() => result.current[1]("invalid"));
    expect(result.current[0]).toEqual({
      inputValue: "invalid",
      isValid: false,
      errorMessage: "Email must includes @",
    });

    act(() => result.current[1]("valid@example.com"));
    expect(result.current[0]).toEqual({
      inputValue: "valid@example.com",
      isValid: true,
      errorMessage: "",
    });
  });
});
