# Safe / Balanced / Risky — risk profile logic (v1.1)

The engine supports three **risk profiles**: `safe`, `balanced`, and `risky`. They control how **league ownership** affects sell scores, buy scores, and transfer ranking via **profile-shaped curves**, **league-size aware thresholds**, and **risky conviction gating**. Momentum and fixture weights (50 and 35) are unchanged; only the league-ownership term and reason labels vary by profile.

---

## 1. Parsing and default

- **Source:** API query `riskProfile=safe|balanced|risky` (optional). Scripts use `FPL_RISK_PROFILE`.
- **Parsing:** `parseRiskProfile(input)`: if `input === "safe"` or `input === "risky"`, return that; otherwise return `"balanced"`.
- **Default:** Omitted or invalid → **balanced**.

---

## 2. League ownership data

- **Fraction L:** `ownershipByPlayerId.get(playerId)` → 0..1 (share of league entries that own the player).
- **Count and size:** `ownershipCountByPlayerId.get(playerId)` (number of entries that own), `totalEntries` (league size).
- **League-size aware thresholds** use count/size for small leagues (e.g. totalEntries < 8) so a 6-person league doesn’t treat 3/6 as “high ownership” by fraction alone.

---

## 3. Sell scoring (who to sell)

Formula:

```text
raw = 50×momentumOut + 35×fixtureBad01 - 15×leaguePenalty + (flagged/unavailable bonus)
```

The **league term** is a **penalty** (0..1) from a **profile-shaped curve**, not raw L.

### League penalty for sell (curves)

`leaguePenaltyForSell(leagueOwnershipPct, riskProfile)` → uses `mapOwnershipForSell`:

| Profile   | Shape | Effect |
|----------|--------|--------|
| **safe** | L² | Strong, smooth penalty for high ownership. |
| **balanced** | 0.5×L^1.1 | Moderate penalty. |
| **risky** | 0.35×L | Small but visible (no longer 0.1×L). |

### Sell reasons (profile + league-size aware)

- **High ownership** uses `isHighOwnership(fraction, countOwned, totalEntries)`: for small leagues (totalEntries < 8), “high” = countOwned ≥ 6; for larger leagues, fraction ≥ 0.6.
- **Safe:** high ownership → *“Widely owned in your league (less urgency to sell)”* and *“Avoiding a risky sell of a template player”* (capped: max 2 profile, 1 ownership reason).
- **Balanced:** when ownership is in a meaningful band (e.g. 0.3–0.7) → *“Moderate league consideration”*.
- Momentum/fixture reasons unchanged.

---

## 4. Buy scoring (who to buy)

Formula:

```text
raw = 50×momentumIn + 35×fixture01 + 15×leagueTerm - (flagged/unavailable penalty)
```

The **league term** (0..1) comes from a **profile-shaped curve**. For **risky**, a **conviction gate** scales the term down when momentum and fixtures are weak.

### League term for buy (curves)

`leagueTermForBuy(leagueOwnershipPct, riskProfile, { momentumIn, fixture01 })` → uses `mapOwnershipForBuy`:

| Profile   | Shape | Effect |
|----------|--------|--------|
| **safe** | Curved: L < 0.3 barely matters; L > 0.6 matters a lot. | Strong reward for meaningfully high ownership. |
| **balanced** | 0.3 + 0.4×L | Mild preference for higher ownership, never dominant. |
| **risky** | 1−L flattened near L=0 (small gain for 0% vs 5%). | Reward differentials without over-rewarding near-zero. |

### Risky conviction gating

For **risky** only: if **neither** momentumIn ≥ 0.5 **nor** fixture01 ≥ 0.5, the ownership term is multiplied by **0.25**. So low-owned players with weak signals don’t get the full differential bonus (avoids “random punts”).

### Buy reasons (profile + league-size aware)

- **High / low ownership** use `isHighOwnership` and `isLowOwnership` (league-size aware).
- **Safe:** high ownership → *“Highly owned in your league”*, *“Covering a popular league pick”*.
- **Balanced:** ownership in band → *“Moderate league consideration”*.
- **Risky:** low ownership → *“Differential upside”*; if conviction gate is satisfied → *“Low ownership, high conviction”*.
- Other reasons (momentum, fixtures, availability, etc.) unchanged; caps: max 2 profile, 1 ownership reason.

---

## 5. Transfer prediction (ranking OUT → IN)

Transfer score = weighted sell + buy score plus weak-link and budget penalties. **There is no safe-only transfer-layer penalty** (v1.1): ownership effects are fully in sell/buy scores and reasons.

---

## 6. Summary table

| Area | Safe | Balanced | Risky |
|------|------|----------|--------|
| **Sell: league** | Strong curved penalty (L²). | Moderate (0.5×L^1.1). | Small (0.35×L). |
| **Buy: league** | Curved: high L rewarded when L high. | Mild (0.3 + 0.4×L). | 1−L flattened; conviction gate. |
| **Transfer layer** | None. | None. | None. |
| **Reasons** | “Widely owned”, “Avoiding risky sell”, “Covering popular”. | “Moderate league consideration”. | “Differential upside”, “Low ownership, high conviction”. |
| **Thresholds** | League-size aware (count/fraction). | Same. | Same. |

---

## 7. Where it’s used in code

- **Parsing:** `src/prediction/riskProfile.ts`
- **Curves and thresholds:** `src/prediction/ownershipProfile/` (curves.ts, thresholds.ts, constants.ts).
- **Sell:** `src/prediction/sellScoring/scoreLogic.ts` (leaguePenaltyForSell → mapOwnershipForSell), `score.ts` (reasons, league-size aware).
- **Buy:** `src/prediction/buyScoring/scoreLogic.ts` (leagueTermForBuy → mapOwnershipForBuy + conviction gating), `score.ts` (reasons).
- **Transfer:** `src/prediction/transferPrediction/predict.ts` (no profile-specific penalty).
- **Debug:** `pnpm run predict:compare-profiles` (script compares top buys/sells/transfers across safe, balanced, risky for one entry).
