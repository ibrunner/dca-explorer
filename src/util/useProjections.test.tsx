import { renderHook } from "@testing-library/react-hooks";
import useProjections from "../util/useProjections";

describe("useProjections", () => {
  test("should return an empty array when no projections are provided", () => {
    const { result } = renderHook(() => useProjections());
    expect(result.current).toEqual([]);
  });

  test("should return the provided projections", () => {
    const projections = ["projection1", "projection2"];
    const { result } = renderHook(() => useProjections(projections));
    expect(result.current).toEqual(projections);
  });

  test("should update the projections when new projections are provided", () => {
    const { result, rerender } = renderHook(
      (projections) => useProjections(projections),
      { initialProps: ["projection1"] }
    );

    expect(result.current).toEqual(["projection1"]);

    rerender(["projection1", "projection2"]);

    expect(result.current).toEqual(["projection1", "projection2"]);
  });
});
