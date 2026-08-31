import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TermsPrivacyField from "./TermsPrivacyField";

const TermsPrivacyFieldHarness = () => {
  const [checked, setChecked] = useState(false);

  return (
    <TermsPrivacyField
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};

describe("TermsPrivacyField", () => {
  it("labels the checkbox without nesting the legal links", async () => {
    const user = userEvent.setup();
    render(<TermsPrivacyFieldHarness />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I have read and agree to the Terms of Service and Privacy Policy",
    });
    const termsLink = screen.getByRole("link", { name: "Terms of Service" });
    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });

    expect(termsLink.closest("label")).toBeNull();
    expect(privacyLink.closest("label")).toBeNull();

    await user.click(screen.getByText("I have read and agree to the"));
    expect(checkbox.checked).toBe(true);
  });
});
