import { describe, expect, it } from "vitest";
import {
  createSliderMeasurements,
  getNextTranslate,
  getPreviousTranslate,
  getSnappedTranslate,
  getVisibleSlideIndexes,
} from "./use-slider";

describe("slider model", () => {
  it("derives measurements from the rendered slider", () => {
    expect(
      createSliderMeasurements({
        containerWidth: 220,
        gap: 20,
        marginLeft: 40,
        slideWidths: [100, 100, 100],
        sliderWidth: 340,
      }),
    ).toEqual({
      containerWidth: 220,
      intervals: [0, -120, -240],
      itemWidth: 120,
      marginLeft: 40,
      translateMax: -120,
    });
  });

  it("moves by one item without crossing either boundary", () => {
    expect(getNextTranslate(0, 120, -240)).toBe(-120);
    expect(getNextTranslate(-240, 120, -240)).toBe(-240);
    expect(getPreviousTranslate(-120, 120)).toBe(0);
    expect(getPreviousTranslate(0, 120)).toBe(0);
  });

  it("snaps dragging to the nearest valid interval", () => {
    const intervals = [0, -120, -240];

    expect(getSnappedTranslate(-190, intervals, -240)).toBe(-240);
    expect(getSnappedTranslate(-300, intervals, -240)).toBe(-240);
  });

  it("derives the visible pagination indexes", () => {
    expect(getVisibleSlideIndexes([0, -120, -240], -120, 220)).toEqual([
      1, 2,
    ]);
  });
});
