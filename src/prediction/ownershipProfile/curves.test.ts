import { describe, it, expect } from "vitest";
import { mapOwnershipForSell, mapOwnershipForBuy } from "./curves";

describe("mapOwnershipForSell", () => {
  it("returns 0 when leagueOwnershipPct is null (neutral)", () => {
    expect(mapOwnershipForSell(null, "safe")).toBe(0);
    expect(mapOwnershipForSell(null, "balanced")).toBe(0);
    expect(mapOwnershipForSell(null, "risky")).toBe(0);
  });
});

describe("mapOwnershipForBuy", () => {
  it("returns 0 when leagueOwnershipPct is null (neutral)", () => {
    expect(mapOwnershipForBuy(null, "safe")).toBe(0);
    expect(mapOwnershipForBuy(null, "balanced")).toBe(0);
    expect(mapOwnershipForBuy(null, "risky")).toBe(0);
  });

  it("risky profile with null ownership does not get differential bonus (0, not high term)", () => {
    const termNull = mapOwnershipForBuy(null, "risky");
    const termZeroOwned = mapOwnershipForBuy(0, "risky");
    expect(termNull).toBe(0);
    expect(termZeroOwned).toBeGreaterThan(0);
    expect(termNull).not.toBe(termZeroOwned);
  });
});
