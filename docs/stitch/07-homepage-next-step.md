# Homepage Next Step Strategy

## Current Situation
- Round 1 failed as a blank or non-page artifact.
- Round 2 produced a partial homepage.
- Round 3 collapsed back into a hero visual asset instead of a complete webpage.

## Interpretation
- Stitch can produce useful product-marketing visuals for this direction.
- But it is not yet reliably respecting the full long-scroll homepage specification in one prompt.

## Recommended Next Move
- Stop treating the homepage as one giant prompt for the next round.
- Generate the homepage as smaller design targets:
  1. top navigation + hero
  2. core value + key features
  3. interactive voice demo section
  4. use-case / placeholder proof section
  5. FAQ preview + final CTA + footer

## Why
- This reduces ambiguity.
- It prevents the model from collapsing into a single “hero visual” output.
- It gives better raw material for later Figma framing and actual implementation.

## Practical Rule
- Use Stitch for section-first exploration.
- Use Figma after a few good section outputs exist.
- Do not move to Figma from a failed whole-page output.
