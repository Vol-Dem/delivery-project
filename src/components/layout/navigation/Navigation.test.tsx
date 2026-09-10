import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FooterNavigation from "./FooterNavigation";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import navigationItems from "./navigation-items";

const navigationComponents = [
  ["main", MainNavigation],
  ["mobile", MobileNavigation],
  ["footer", FooterNavigation],
];

describe.each(navigationComponents)("%s navigation", (_name, Navigation) => {
  it("uses the shared native hash links", () => {
    render(<Navigation />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(navigationItems.length);

    navigationItems.forEach(({ id, name }, index) => {
      expect(links[index].textContent).toBe(name);
      expect(links[index].getAttribute("href")).toBe(`#${id}`);
    });

    expect(fireEvent.click(links[0])).toBe(true);
  });
});
