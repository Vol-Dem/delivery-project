import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIntersection } from "./use-intersection";

const observe = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(function IntersectionObserverMock() {
      return { observe, disconnect };
    }),
  );
});

describe("useIntersection", () => {
  it("recreates the observer when its root margin changes", () => {
    const element = document.createElement("section");
    const ref = { current: element };
    const { rerender, unmount } = renderHook(
      ({ rootMargin }) => useIntersection(ref, rootMargin),
      { initialProps: { rootMargin: "-40" } },
    );

    expect(IntersectionObserver).toHaveBeenLastCalledWith(
      expect.any(Function),
      { rootMargin: "-40%" },
    );
    expect(observe).toHaveBeenCalledWith(element);

    rerender({ rootMargin: "-20" });

    expect(disconnect).toHaveBeenCalledOnce();
    expect(IntersectionObserver).toHaveBeenLastCalledWith(
      expect.any(Function),
      { rootMargin: "-20%" },
    );
    expect(observe).toHaveBeenCalledTimes(2);

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(2);
  });
});
