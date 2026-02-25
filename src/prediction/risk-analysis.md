You are working in the repo `fpl-radar`.

Implement **Risk Profiles v1.1 – Improve Safe/Balanced/Risky behaviour and explainability**.

Context: Transfer predictions look good, but the current risk profile logic (safe/balanced/risky) may not be producing the “feel” we want. The current design changes only the league-ownership term (and adds a safe-only transfer penalty). This doc proposes improvements that make profiles more distinct, more predictable, and less “surprising”, while staying simple and explainable. 

---

## 1) Current behaviour summary (so we’re aligned)

* Sell score: momentumOut + fixtureBad01 − ownership penalty (penalty strength depends on profile).
* Buy score: momentumIn + fixtureGood + ownership term (term changes by profile; risky uses 1−L).
* Transfer layer: only safe adds an extra −20 penalty for selling high-owned OUT unless a “strong sell signal” is present. 

The model is coherent, but there are a few places where it can yield unintuitive ranking shifts or profiles that don’t feel different enough.

---

## 2) Problems / symptoms to look for

### A) “Balanced” can feel like “Safe-lite” rather than its own personality

Balanced is just a 0.5 multiplier on the league term in both buy and sell. That often isn’t distinct enough for users to notice.

### B) Risky buy term (1 − L) can over-favour ultra-low ownership “random differentials”

Because league ownership is a big term (weight 15), risky mode can elevate low-owned players even when momentum/fixtures are only mildly good. This is especially noticeable in smaller leagues where a player being “0% owned” is common and noisy.

### C) Safe-only transfer-level −20 can be redundant and sometimes too blunt

Safe already discourages selling high-owned players via the sell score penalty. Adding a second penalty at transfer ranking can:

* double-penalise template sells
* create “why is this obviously good transfer missing?” moments if the waiver thresholds aren’t met
* introduce discontinuities (a player crosses a threshold and suddenly a whole cluster of transfers jumps)

### D) Ownership thresholds aren’t league-size aware

Using hard thresholds like L ≥ 0.6 or L < 0.2 behaves differently depending on league size:

* In a 6-person league, 0.6 means “4/6 own”.
* In a 20-person league, 0.6 means “12/20 own”.
  Those situations feel very different.

### E) The model is “ownership only” for risk profile, but riskiness is also about conviction

A truly “risky” move should usually require stronger underlying signals (momentum/fixtures) to justify the differential. Right now, riskiness is mainly “low ownership = good”, not “low ownership + strong signals = good”.

---

## 3) Desired behaviour (product intent)

Define what each profile should mean:

### SAFE

* Prioritise “cover” and minimise downside.
* Strongly prefers buying high-league-owned players when other signals are decent.
* Strongly resists selling high-league-owned players unless there’s a strong reason.

### BALANCED

* Mostly rational, not too template, not too differential.
* Still considers league ownership, but momentum/fixtures should dominate.
* Avoids extreme behaviours:

  * doesn’t blindly chase 0% league-owned
  * doesn’t refuse to sell templates when the sell case is strong

### RISKY

* Actively seeks upside via differentials.
* Prefers low league-ownership buys, but only when momentum/fixtures are strong enough (avoid random punts).
* Will sell template players more readily if there’s a credible case, not purely for the sake of it.

---

## 4) Implementation changes (best fixes)

### 4.1 Replace linear ownership mapping with profile-shaped curves

Right now, buy uses L (safe), 0.5L (balanced), 1−L (risky). Sell uses L, 0.5L, 0.1L as penalties. 

Improve this by using curved mappings so each profile behaves more naturally:

* SAFE (buy): strongly rewards high ownership only when it’s meaningfully high.

  * Example behaviour: L < 0.3 barely matters; L > 0.6 matters a lot.
* BALANCED (buy): small, smooth preference for higher ownership, never dominant.
* RISKY (buy): rewards low ownership, but avoid huge benefit for “near-zero”.

  * Example behaviour: big difference between 0.6 and 0.2, but small difference between 0.05 and 0.00.

Similarly for sell penalties:

* SAFE (sell): penalise selling high-owned strongly, but smoothly.
* BALANCED (sell): moderate penalty.
* RISKY (sell): small penalty, but not “almost zero” (0.1×L can be too weak to matter).

Acceptance: ownership influence feels “graded” rather than cliff-like, and profiles become more distinct without needing huge weights.

---

### 4.2 Make risky differentials require conviction (gating)

Add a simple “conviction gate” for risky buy behaviour:

* If riskProfile is risky, apply the differential (low-ownership) bonus only if at least one of:

  * momentumIn is high enough, OR
  * fixture score is high enough

If conviction is low:

* reduce the risky ownership bonus
* or cap it at a small value

This prevents risky mode from surfacing low-owned players with weak signals.

Acceptance: risky mode surfaces “credible differentials”, not random 0% punts.

---

### 4.3 Remove the safe-only transfer-layer −20, or downgrade it to a gentle adjustment

Safe already discourages selling templates via sell score. The extra transfer-layer penalty can be redundant and create non-obvious ranking jumps. 

Preferred approach:

* Remove the safe-only −20 transfer penalty entirely and rely on the consistent scoring model (sell + buy). Use reasons/explainability to convey “template hold” rather than a second-stage penalty.

Alternative (if you want to keep a transfer-layer nudge):

* Replace −20 with a small, smooth adjustment that scales with ownership and is waived automatically by strong sell signals (as today), but is smaller and less binary.

Acceptance: safe ranking becomes more consistent and easier to reason about; fewer “why did this drop off a cliff?” moments.

---

### 4.4 Make ownership thresholds league-size aware

Instead of hardcoding “L ≥ 0.6” and “L < 0.2”:

* compute ownership as both:

  * fraction L (0..1)
  * countOwned and totalEntries
* base “high ownership” on either:

  * countOwned ≥ a minimum number (e.g. at least 6 rivals), OR
  * fraction threshold that scales for small leagues

At minimum:

* if totalEntries < 8, raise the “high ownership” threshold (because a couple owners swing the % too easily)
* if totalEntries is large, keep the fraction thresholds

Acceptance: a 6-person league doesn’t treat 3/6 as “high ownership” unless you explicitly want it to.

---

### 4.5 Improve reasons so each profile “explains itself”

Right now:

* safe adds “widely owned” sell reason
* risky adds “strong differential” buy reason
* balanced has no profile-specific reason messaging. 

Add consistent, minimal profile reason labels:

* SAFE:

  * “Covering a popular league pick”
  * “Avoiding a risky sell of a template player”
* BALANCED:

  * “Moderate league consideration” (only when ownership meaningfully influenced score)
* RISKY:

  * “Differential upside”
  * “Low ownership, high conviction” (only when gate is satisfied)

Also:

* ensure reason spam is controlled (max 2 profile reasons, max 1 ownership reason).

Acceptance: switching profiles is visible not just in ranking but also in the explanations.

---

### 4.6 Add a small “profile sensitivity” constant and keep weights stable

Your base weights are:

* momentum 50
* fixtures 35
* league term 15 

Keep these weights stable to avoid destabilising transfer prediction quality. Instead, implement profile differences by:

* transforming the ownership input (curves, gating)
* scaling the ownership term slightly per profile (a “profileSensitivity” factor), rather than rewriting core weights

Acceptance: existing good prediction quality remains, but profile differences are more intuitive.

---

## 5) Validation plan (how to know it’s working)

Add a lightweight comparison script or debug mode that prints, for a single entry:

* top 10 buys under safe/balanced/risky
* top 10 sells under safe/balanced/risky
* top 10 transfers under safe/balanced/risky
* and for each item: momentum, fixture score, league ownership (count + %), and which profile adjustments applied

Manual checks:

* SAFE should converge toward “cover + sensible holds”
* RISKY should show credible differentials but not junk
* BALANCED should feel like the normal/default mode and not swing too hard

Also test across:

* small league (<= 8 entries)
* medium league (~12 entries)
* larger league (>= 20 entries)
  to ensure thresholds behave well.

---

## 6) Implementation order

1. Introduce league-size aware ownership metadata (countOwned, totalEntries) wherever ownership is computed.
2. Implement ownership mapping curves per profile (buy and sell).
3. Add risky conviction gating for differential bonus.
4. Remove (preferred) or soften (alternative) the safe-only transfer-layer penalty.
5. Improve profile-specific reasons, including balanced.
6. Add a debug comparison output to verify safe/balanced/risky differences quickly.

---

## Acceptance criteria

* Balanced feels distinct from safe and risky (not just “half safe”).
* Risky does not elevate low-owned players unless momentum/fixtures show conviction.
* Safe does not have abrupt ranking drops due to a blunt second-layer penalty.
* Ownership-based reasons are clear, concise, and profile-appropriate.
* Behaviour is stable across different league sizes.
