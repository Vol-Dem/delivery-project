import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

class ObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  configurable: true,
  value: ObserverMock,
});

Object.defineProperty(globalThis, "ResizeObserver", {
  configurable: true,
  value: ObserverMock,
});

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(Element.prototype, "getAnimations", {
  configurable: true,
  value: vi.fn(() => []),
});

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ geonames: [] }),
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
