# Models, assumptions, and sources

The course separates **computed numerical evidence** from **deductive proofs**. A plotted example never proves a universal claim. Proof workshops state a claim, expose four justified steps, and explain why its assumptions matter.

## Fidelity ledger

| Object | Classification | Mechanism and limits |
| --- | --- | --- |
| Vector sums, dot products, norms | COMPUTED | Direct coordinate arithmetic in `js/model.js` and `js/app.js`. Real Euclidean vectors. |
| Geometry | SIMPLIFIED | Two dimensions, equal axis scales. Label positions move for readability, not the vector coordinates. Terminal-themed diagrams use solid light input strokes, dashed gray comparison strokes, and a heavier muted-green result stroke; labels retain object identity. Fixed plot boundaries can omit extreme results; numeric readouts retain them. |
| Matrices | COMPUTED | Editable 2×2 maps; basis images and grid lines are matrix-vector products. Determinant gives signed area; area scale uses its absolute value. |
| Rank | COMPUTED / SIMPLIFIED | 2×2 rank via determinant and entry checks, tolerance 1e-9. This is not a robust general-purpose numerical rank estimator. Exact dependent presets show the intended case. |
| Projection | COMPUTED | `u(uᵀx)/(uᵀu)` with an explicitly nonzero unit direction in the lab. The pure model flags a zero direction as undefined. |
| Eigenvectors | ASSUMED / COMPUTED | Fixed symmetric A = ((1.4,0.6),(0.6,1.4)); eigendirections 45° and −45° with eigenvalues 2 and 0.8. Powers are executed, not interpolated. |
| SVD | COMPUTED | A real 2×2 SVD from the eigensystem of AᵀA. The lab builds A = R(25°)diag(3,s)R(−35°), 0 ≤ s ≤ 3; truncation is reconstructed from computed factors. Error is the discarded singular value. Degenerate singular directions are not unique. |
| Descent | SIMPLIFIED / COMPUTED | Loss L(x,y) = 0.5(x²+4y²), start (2,1). Every iterate is computed from the start. Editing the learning rate recomputes the complete trajectory. Scrubbing never applies extra updates. The fixed viewport may omit divergent points; loss and coordinates remain actual values. |
| Softmax | COMPUTED | Subtract maximum before exponentiation; positive temperature. Three logits; shared shifts and tied logits supported. Loss uses a one-hot target on the first item; entropy and loss are in nats. |
| Embeddings | ASSUMED / COMPUTED | Four named rows with chosen coordinates; lookup, tied unembedding scores and probabilities are computed. Selected input token and edited hidden state are independent. No learned semantics or contextual representation is claimed. |
| Attention | SIMPLIFIED / COMPUTED | Three input token rows ((1,0),(0,1),(1,1)); d=d_k=d_v=2. Q=XWQ, K=XWK, V=XWV. WK=((1,0),(0.5,1)), WV=((1,0.5),(0,1)); WQ=((1,mix),(0,1)). Scores divide by sqrt(2). Causal future scores are -Infinity before stable row softmax. Output is PV. |
| Attention omissions | SIMPLIFIED | One head. No positional encoding, learned training, dropout, output projection, MLP, normalization or residual addition. Temperature is an experimental extra; the standard equation has T=1. |
| Norm propagation | COMPUTED | A=R(0.5)diag(a,0.3), B=diag(b,0.4)R(-0.3), angles in radians. Bounds a≥0.3 and b≥0.4 make a and b the actual operator norms. Input displacement has norm 2. |
| Prediction/transfer cases | ASSUMED teaching inputs | Fixed, separate cases explicitly labeled independently of the editable lab. Feedback is deductive, not an assessment of unseen lab inputs. Selection reveals the explanation; correctness never gates progress. |
| Visual timing | ILLUSTRATIVE | Entrance and hover motion have no numerical meaning. No automatic model evolution. Reduced motion removes transitions without changing computations. |

## Numerical conventions

JavaScript IEEE-754 double precision. Values are rounded for display (usually two decimals, attention probabilities three). Readouts may not sum exactly after rounding, although underlying probabilities are normalized. The model does not round its state. Close-to-zero display tolerance is 1e-6; rank/model tolerance is 1e-9. Model tests use absolute tolerance 1e-8 unless otherwise specified. Extremely large floating-point shifts can destroy logit differences before softmax; the lab bounds shifts at 100. Zero-vector cosine is explicitly undefined. Every causal row includes the current token; an all-masked row is not offered.

Coordinates: 2D vectors are ordered (x,y); plots use a mathematical upward y-axis. Proof vectors are columns. Token batches use rows; the text explicitly translates embedding lookup and unembedding conventions. When `V` denotes vocabulary size it is a scalar dimension; the attention value matrix `V` is a different context-specific object.

## Claim and source map

The explanations, constructions, experiments, questions and short proofs are original teaching material. Sources below provide optional primary references, not the measured output of this website.

- [Goodfellow, Bengio & Courville, *Deep Learning*, chapter 2](https://www.deeplearningbook.org/contents/linear_algebra.html): definitions and mathematical reference; sections 2.1–2.3 for arrays and linear systems, 2.5–2.9 for norms, eigendecomposition, SVD and pseudoinverse. Course chapters 1–7 independently derive elementary identities and examples.
- [Vaswani et al., *Attention Is All You Need*, §3.2.1](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS1): scaled dot-product attention formula. Course chapters 9 and 11 compute a reduced instance. The variance explanation requires independent, mean-zero, unit-variance query/key coordinates, as stated in the chapter.
- Same paper, §3.2.2 and §3.4: multi-head structure and embedding/softmax discussion. The site describes these roles, but does not reproduce the paper’s complete model.
- [Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models*, §4.1](https://arxiv.org/abs/2106.09685): factorized learned weight updates. The course’s rank proof is a mathematical consequence of a product through an r-dimensional space. It makes no empirical claims about adaptation performance.

## Coverage limits

The course includes basics of tensors/shapes, vector spaces, bases, rank/nullity, orthogonal projection, least squares, symmetric eigendecomposition, PSD matrices, SVD, matrix norms, derivatives/Jacobians, gradient descent, probability/entropy/cross-entropy, embeddings, normalization, positional information, attention, and elementary sensitivity proofs. It does not teach measure theory, concentration inequalities, advanced optimization, numerical linear algebra in full, training a transformer, or establish a general theory of LLM behavior.
