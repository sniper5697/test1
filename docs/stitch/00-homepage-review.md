# Homepage Review Round 1

## Verdict
- The first Stitch homepage output is not usable.
- The downloaded `homepage.png` is visually blank.
- The downloaded `homepage.html` is not a real landing-page document. It contains a logo-style prompt string instead of a structured page.

## What Failed
- The result did not produce a readable homepage composition.
- The output behaved more like an isolated visual asset or prompt artifact than a complete screen.
- The design did not reach the required criteria for:
  - product-first homepage structure
  - visible `데모 보기` CTA
  - clear section hierarchy
  - bright premium tech direction

## Likely Cause
- The prompt was not explicit enough about generating a full-page website screen.
- The visual direction allowed too much ambiguity and may have let Stitch collapse toward a logo/concept artifact instead of a landing page.
- The prompt did not explicitly forbid single-object, poster, or component-only outputs.

## Required Corrections
1. Force a full desktop landing-page composition with vertically stacked sections.
2. Explicitly require a light background and forbid black-dominant output.
3. Provide stronger Korean copy guidance for the hero and section headings.
4. Specify navigation, hero, demo, FAQ preview, CTA, and footer as visible sections in one page.
5. Explicitly forbid:
   - logo-only output
   - poster composition
   - isolated component exploration
   - dark empty stage background

## Next Step
- Regenerate the homepage with a stricter Stitch prompt.

## Round 2 Result
- The second Stitch output became a real webpage instead of a blank artifact.
- This is meaningful progress, but the page is still incomplete against the homepage spec.

## Round 2 Wins
- Real HTML document was produced
- Korean hero headline is present
- Main CTA is visible
- Bright visual tone is closer to the desired direction

## Round 2 Remaining Gaps
- The page still looks too short and under-structured
- The required sections are not all visibly present
- Missing or weak sections:
  - core value section
  - key features section
  - interactive voice demo section
  - FAQ preview
  - final CTA section
- Navigation/content drift appeared:
  - extra `시작하기` button
  - `기술 문서` secondary CTA
  - pricing-style navigation that was not part of the agreed first scope

## Round 2 Correction Direction
1. Force the homepage to be a long scroll page with all required sections visible.
2. Explicitly define the section headings in Korean.
3. Forbid extra secondary CTA behavior in the hero.
4. Force a visible interactive voice demo block with waveform and transcript states.
5. Require FAQ preview and final CTA as distinct bottom sections.
