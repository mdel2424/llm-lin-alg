# Verification record

GATE: ERROR — the design-skill gate could not run its browser checks in the restricted authoring environment. Its subprocess and Chrome checks reported EPERM. It was not rerun, per the skill’s error instructions. This is not a visual approval.

## Completed checks

- `npm run check`: syntax passed for the three runtime JavaScript files.
- `npm test`: **12 tests passed** (8 model tests and 4 content/package tests).
- Additional syntax checks for both browser test files passed.
- `node …/intuition-explainer/scripts/verify.mjs --site …`: **7 JavaScript files passed syntax checks; 9 local links/assets resolved.**
- `node …/design-taste-frontend/scripts/copy-lint.mjs index.html --kind software`: 0 failures, 0 warnings. This checks the static document, not every dynamically rendered lesson.
- All twelve chapters contain an experiment, four mathematical reference sections, a four-step deductive proof, assumption notes, a prediction, and a distinct transfer case.
- Font files are bundled locally with their attribution and the full Apache 2.0 license.

Numerical tests cover linearity, orthogonality, exact dependent-column rank, a null vector, closest projection, SVD reconstruction for general/zero/singular/reflection matrices, finite-difference gradients, convergence and divergence, stable softmax with large shifts, uniform probabilities, causal masking, attention normalization and convex-mixture bounds, embedding dimensions, and operator-norm bounds for many input angles. Transfer tests check that nonlinear softmax can increase score-matrix rank, a low-rank update does not imply a low-rank final matrix, and a residual bound can be attained.

## Browser verification limitation

The shared offline browser harness first found a mismatch between its installed Playwright version and cached browser. A second attempt pointing it to the already-cached Chromium failed to launch: the environment prohibits the required process/socket operations (`Operation not permitted`). No privileges were requested and no policy was bypassed. No browser screenshots were generated or visually inspected.

Consequently, real-browser interaction, mobile rendering, font/label layout, focus behavior, screen-reader behavior, 200% zoom, motion preferences, and page performance **remain unverified**. The site includes `tests/browser.mjs` and `tests/browser-scenarios.mjs` so these checks can be run on a normal development machine. See README for the exact commands. A display at 640 CSS pixels approximates reflow but does not establish actual browser-zoom accessibility.

The scenarios visit every chapter and all three views through actual controls; check hidden feedback before prediction; reveal and reset every proof; answer every transfer case; operate editable matrices, sliders, keyboard/pointer vector controls, masking, search and progress; and capture screenshots at desktop, laptop, tablet, mobile, narrow, landscape and reflow sizes. These describe included test coverage, not a completed pass.

## Pedagogical review

1. **Mental model:** a matrix remaps basis directions; combinations, inner products, subspaces and induced norms compose into attention and elementary LLM arguments.
2. **First minute:** the home experiment adds two arrows before formal notation is required. Vector dragging and reversal are available immediately.
3. **Prediction:** each chapter offers a stated new case; its answer remains hidden until a choice is committed. Cases are separate from freely editable lab inputs.
4. **Manipulation:** vectors and hidden states have pointer/keyboard/numeric control; other chapters expose directions, matrices, singular values, learning rates, logits, temperatures and masks.
5. **Consequences:** equations, coordinates, probability rows, losses or bounds are recomputed from the model state. These connections are statically reviewed and numerically tested; real UI execution remains unverified.
6. **Failure cases:** dependent columns collapse a plane; zero vectors make cosine undefined; η > 0.5 diverges in the quadratic; nonlinear softmax invalidates a naive rank argument.
7. **Notation:** experiment precedes the math tab; the mathematical reference explains each operation and why it is useful.
8. **Linked representations:** named input/comparison/result vectors, equations and numeric readouts; solid/dashed strokes and one result accent replace the earlier multicolor palette. Mobile label readability still needs visual inspection.
9. **Calculated claims:** all editable lab quantities use actual numerical functions. Fixed quizzes and proofs use explicit stated teaching cases; tests independently validate numeric answers and counterexamples.
10. **Illustrative values:** About, per-lab details and FIDELITY.md explicitly separate chosen weights/token names from learned language behavior.
11. **Learner control:** no autoplay, waiting period, navigation lock or timed reveal. Proofs and descent can be stepped/revisited/reset.
12. **Transfer:** new cases reverse questions or remove assumptions: uniqueness with redundant columns, discarded-tail errors, transpose backprop shapes, attention nonlinearity, residual sensitivity.
13. **Explanation:** every proof ends with a prompt to explain what changed and which hypothesis mattered, then reconnects the result to language models. This is a design review, not a learner study.

## Design adaptations

Educational software uses a persistent index, content-height lessons, dark neutral surfaces, locally bundled DejaVu Sans Mono, neutral input/comparison strokes and a single muted-green result accent, and a split introduction. The marketing skill’s dealt marquee, full-screen section locks and stock-asset recipes were omitted because they conflict with the learning task and the intuition-explainer guidance. No stock imagery, missing client assets, invented empirical results, contacts or canonical domain are used. No waiver claims a browser pass.


## Terminal restyle review

User direction: clean, modern, dark, terminal-inspired; color permitted sparingly. The page now uses local DejaVu Sans Mono throughout, near-black surfaces, white primary controls, two-pixel corners, and one muted-green accent. Heading emphasis stays white. Active states, focus, progress and computed results share the accent. Diagram comparisons are dashed; result arrows are thicker; quiz outcomes also use check/cross markers and border styles. Favicon and share artwork match the theme. Educational copy now names objects rather than obsolete colors.

After the restyle, `npm run check`, all 12 tests, the 7-file syntax/9-link asset check and the static copy lint passed (0 warnings/failures). The design-skill gate was attempted with the cached Chromium path and again returned `GATE: ERROR` because subprocess/browser checks were prohibited (`EPERM`). No visual, interaction, layout or performance pass is claimed. The gate was not retried after that error. Static palette and local-font-reference checks were also completed; these do not replace browser inspection.


## Final publication pass

Fixed the skip link so it focuses the active lesson without changing its hash route, and preserved the skip link as the first Tab stop on initial load. Closed mobile navigation is now inert and excluded from the accessibility tree; opening it confines keyboard focus to its controls, makes background lesson controls inert, and Escape restores focus to the menu trigger. Proof steps update a persistent polite announcement region. Quiz resets restore focus to the first choice. Clearing completion updates the current chapter button, home resume action and learning-path indicators immediately.

Added browser regression scenarios for those behaviors, an integrity-locked `package-lock.json`, and a static packaging command. `npm ci --offline --ignore-scripts` successfully installed the two Linux development packages from the existing cache. The final `npm run check` and all 12 model/content tests passed. `npm run package` resolved 11 links/assets in the standalone artifact, including the local fonts. A PNG social-sharing image was rendered from the site's SVG artwork and visually inspected; this is not a screenshot or visual verification of the website.

The direct `npm run test:browser` command was retried with the matching installed Playwright 1.58.2 and cached Chromium 1208. Chromium again terminated before any page could open because the environment prohibits its required process/socket operation (`sandbox_host_linux.cc: shutdown: Operation not permitted`). No browser scenario or website screenshot passed locally. This limitation is unresolved and should not be read as a successful visual sign-off.

The GitHub Actions workflow now requires the browser scenarios before publishing, uploads screenshots/report for review, checks pull requests without deploying, and verifies the final `_site` artifact. Its configuration was checked against the official GitHub Pages and Playwright CI docs. The updated workflow itself has not been run on GitHub here. Use the Actions publishing path; a successful browser job is the remaining release check. No remote publication occurred.


## CI runner compatibility fix

The first reported GitHub run failed while installing browser dependencies on Ubuntu 26.04, which the locked Playwright 1.58.2 does not support. Both workflow jobs now pin `ubuntu-24.04`. The installed Playwright 1.58.2 registry and dependency tables explicitly contain `ubuntu24.04-x64`; this keeps the lockfile and browser versions unchanged. Workflow YAML parsing confirms both job images and that deployment still requires the check job. The corrected GitHub run has not been observed here. Push this change and run the workflow on that new commit (rerunning the old failed commit retains its old workflow).
