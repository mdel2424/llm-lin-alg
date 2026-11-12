Kind: software; a self-paced interactive textbook for a returning first-year linear algebra student.
Design: per the user's revised brief, a clean terminal-inspired interface: neutral black/gray/white surfaces, locally bundled DejaVu Sans Mono, sharp two-pixel corners, white primary controls, and a single restrained muted-green accent. Inputs use solid neutral arrows, comparisons use dashed gray arrows, and results use the accent with a heavier stroke. Preserve the split introduction, persistent course index, content-height lessons, and all teaching interactions. No decorative console output, blinking cursors, stock images, or marketing screen locks. Main action: Start learning.
Voice: precise, patient, second person; name what changes and why. Distinguish numerical evidence from proof.

Learning target: given a transformer expression or elementary norm/rank proof, check shapes, explain its operations geometrically, identify assumptions and follow each inequality.
Assumed knowledge: arithmetic, coordinates, school algebra; prior exposure to university linear algebra. Calculus and probability are supplied as explicit bridge chapters.
Inline prerequisites: scalar/vector/matrix/tensor, indices, summation, transpose, real dimensions, derivatives, probability and logarithms in the reference dialog.
Dependency chain: combinations → inner products → maps → rank → projections → eigenvectors → SVD → Jacobians → softmax → embeddings → attention → proof transfer.
Mini-explainers: three lesson views (intuition, math, proof); chapter links return to the relevant prerequisite.
Conceptual bottleneck: symbols are operations on objects with shapes; all subsequent arguments reuse linear combinations, orthogonality, and operator bounds.
Naive mental models and counterexamples: long means similar (opposite vectors); any two vectors span the plane (dependent columns); a large step always learns faster (quadratic divergence); attention picks one token (convex mixture); low rank means a small matrix (large factorization).
Smallest worlds: 2D Euclidean geometry; two-by-two matrices; three-token, two-feature attention; a diagonal quadratic. No trained model or empirical language claims.
Invariants: linearity; Cauchy–Schwarz; rank-nullity; projection residual orthogonality; SVD reconstruction; softmax translation invariance; causal masked weights zero; convex weights sum to one.
Intuition arc per chapter: concrete task → editable experiment → committed prediction on a hidden new case → computed feedback → formal definition → stepwise deductive proof → new transfer question.
Predictions: a fixed, independent case per chapter with three choices; predictions precede computed feedback. Experiment state is explicitly separate from the case. Changing case invalidates answer; no navigation gate.
Representations: SVG with equal axes and arrow labels; paired numeric HTML; matrix tables; softmax bars; attention weights and value vectors; proof inequalities.
Manipulations: vector dragging with numeric alternatives, sliders, matrix cells, presets, discrete iteration controls and resets. No autoplay; no timing dependency.
Model contract: pure functions in js/model.js, no DOM or timers; finite real inputs from bounded controls; floating-point tolerance 1e-9. Expose undefined cosine for zero vectors. Exact rank classification has tolerance 1e-9. SVD from symmetric 2x2 eigensystem.
Formal bridge: every chapter derives a usable identity from its experiment; proof views expose assumptions and a line-by-line original proof.
Transfer: attention rank versus softmax rank, rank of a factorized update, norm propagation through residual maps, and source equation shape checks.
Source map: original mathematical derivations; Deep Learning ch. 2 as optional reference; Vaswani et al. §3.2.1 (attention), §3.2.2 (heads), §3.4 (embedding); Hu et al. §4.1 (low-rank parameterization). Links in the site and FIDELITY.md.
Fidelity ledger: FIDELITY.md. Model tests run before presentation; browser QA via skill harness where available.
