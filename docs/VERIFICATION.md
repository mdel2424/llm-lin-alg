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
