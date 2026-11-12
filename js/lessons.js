(function(root){
'use strict';
const lessons=[
{
 id:'vectors',group:0,title:'Vectors & combinations',subtitle:'Build a vector from smaller moves.',
 lead:'A vector is an ordered list of numbers. In two dimensions, you can see it as a move: a little right, a little up. Higher-dimensional vectors follow exactly the same rules.',
 experiment:'Build a new direction',invitation:'Drag the tip of b, then change the two coefficients. Can you make the result vector point left while both original vectors point right?',
 idea:'Scaling changes the length of a move; a negative coefficient reverses it. Adding places the second move at the end of the first. The result arrow is the same result whether you add a then b or b then a.',
 connection:'Attention produces weighted sums of value vectors. The residual stream adds a new vector to the current representation. Both operations are linear combinations, even when the coefficients were chosen by a nonlinear function.',
 math:[
 ['Coordinates are a choice','A scalar is one real number. A vector x ∈ ℝᵈ contains d ordered real coordinates. A matrix A ∈ ℝᵐˣⁿ stores m rows and n columns. A tensor generalizes this to more axes; a batch of token vectors can have shape (batch, tokens, features).'],
 ['The operation','y = αa + βb','Each coordinate obeys yᵢ = αaᵢ + βbᵢ. In 2D, a = (2, 1) and b = (−1, 2), so 2a + b = (3, 4). The same definition works for a 4,096-dimensional hidden state.'],
 ['From two moves to a space','span{a₁, …, aₖ} = {Σᵢ cᵢaᵢ : cᵢ ∈ ℝ}','A span contains every vector you can reach with these moves. Coefficients can be negative and need not sum to one. Attention adds constraints later: its coefficients are nonnegative and sum to one.'],
 ['Index notation','Σᵢ₌₁ᵈ xᵢyᵢ = x₁y₁ + ⋯ + x_d y_d','The index i is a temporary label. A repeated sum is often easier to read by writing the first two terms and checking which indices remain free.']
 ],
 proof:{title:'A weighted average stays between its inputs',claim:'If vᵢ ∈ ℝᵈ, αᵢ ≥ 0 and Σᵢαᵢ = 1, then each coordinate of y = Σᵢαᵢvᵢ lies between the smallest and largest input coordinates.',steps:[
 ['Fix a coordinate j. Let m = minᵢ vᵢⱼ and M = maxᵢ vᵢⱼ.','Choose a single coordinate so the vector statement becomes a scalar inequality.'],
 ['αᵢm ≤ αᵢvᵢⱼ ≤ αᵢM','Multiplication preserves the order because every αᵢ is nonnegative.'],
 ['mΣᵢαᵢ ≤ Σᵢαᵢvᵢⱼ ≤ MΣᵢαᵢ','Add the inequalities, keeping all three sums.'],
 ['m ≤ yⱼ ≤ M','Use Σᵢαᵢ = 1. This is a coordinate bound for a convex combination.']
 ],limit:'Allow a negative weight and the claim can fail: 2·(1) − 1·(0) = 2. The normalization assumption alone is insufficient.'},
 prediction:{question:'With a = (2, 1), b = (−1, 2), where does 2a + b end?',choices:['(3, 4)','(1, 3)','(2, 4)'],answer:0,feedback:'2(2, 1) + (−1, 2) = (4 − 1, 2 + 2) = (3, 4). Scale each coordinate before adding.'},
 transfer:{question:'An attention head mixes (−2, 3) and (4, 1) with weights ¼ and ¾. Which output is possible?',choices:['(2.5, 1.5)','(5, 2)','(−3, 4)'],answer:0,feedback:'¼(−2, 3) + ¾(4, 1) = (2.5, 1.5). Each coordinate stays inside the range of the corresponding input coordinates.'}
},
{
 id:'dot-products',group:0,title:'Dot products & norms',subtitle:'Separate length from alignment.',
 lead:'Two arrows can be long and still point in opposite directions. A dot product measures how strongly one vector points along another; a norm measures its size.',
 experiment:'Turn a vector, change a score',invitation:'Rotate b through a full turn. Keep its length fixed first. Then make it longer. What changes at a right angle?',
 idea:'Aligned vectors give a positive dot product, perpendicular vectors give zero, and opposed vectors give a negative value. Length affects the dot product; cosine similarity divides out both lengths.',
 connection:'Attention compares learned query and key vectors using dot products. This is a learned compatibility score. It is not automatically cosine similarity, and a large score can reflect length as well as direction.',
 math:[
 ['The dot product','aᵀb = Σᵢ aᵢbᵢ = ‖a‖₂ ‖b‖₂ cos θ','The transpose turns a column into a row, so aᵀb is a scalar. The geometric equality uses the Euclidean inner product. Orthogonal means aᵀb = 0.'],
 ['Length and distance','‖x‖₂ = √(xᵀx),   dist(x, y) = ‖x − y‖₂','The L₁ norm is Σᵢ|xᵢ|; the L∞ norm is maxᵢ|xᵢ|. A norm is nonnegative, homogeneous under absolute scaling, and satisfies the triangle inequality. A dot product can be negative; a norm cannot.'],
 ['Normalize with care','cos θ = (aᵀb) / (‖a‖₂ ‖b‖₂)','This is defined only for nonzero a and b. Cosine similarity describes direction; it discards magnitude. Unit normalization maps x to x/‖x‖₂ when x ≠ 0.'],
 ['The inequality behind many proofs','|aᵀb| ≤ ‖a‖₂ ‖b‖₂','Cauchy–Schwarz turns an alignment-dependent quantity into an upper bound involving only lengths. Equality holds for linearly dependent vectors, including a zero vector.']
 ],
 proof:{title:'Cauchy–Schwarz from a nonnegative square',claim:'For all real vectors a and b of the same dimension, |aᵀb| ≤ ‖a‖₂‖b‖₂.',steps:[
 ['If b = 0, both sides are 0. Otherwise let t = (aᵀb)/(bᵀb).','Deal with the zero denominator before dividing.'],
 ['0 ≤ ‖a − tb‖₂² = aᵀa − 2t aᵀb + t²bᵀb','A squared Euclidean length is always nonnegative.'],
 ['0 ≤ ‖a‖₂² − (aᵀb)²/‖b‖₂²','Substitute the chosen value of t and simplify.'],
 ['(aᵀb)² ≤ ‖a‖₂²‖b‖₂²','Multiply by the positive denominator and take square roots.']
 ],limit:'The proof uses a real Euclidean inner product. Complex vectors require a conjugate transpose and absolute values in the corresponding expansion.'},
 prediction:{question:'a = (3, 0), b = (0, 5). What is aᵀb?',choices:['15','0','8'],answer:1,feedback:'The vectors are perpendicular: 3·0 + 0·5 = 0. Their lengths alone do not determine their alignment.'},
 transfer:{question:'Multiply a nonzero query q by 10 while keeping a nonzero key k fixed. What happens?',choices:['Dot product ×10; cosine unchanged','Both ×10','Neither changes'],answer:0,feedback:'The dot product is linear in q. In cosine similarity, the factor 10 cancels between the numerator and the norm in the denominator.'}
},
{
 id:'linear-maps',group:0,title:'Matrices & linear maps',subtitle:'A matrix tells you where the basis goes.',
 lead:'Instead of memorizing row-by-column multiplication, watch a whole coordinate grid move. A linear map stretches, rotates, reflects or collapses space while keeping the origin fixed.',
 experiment:'Reshape the coordinate grid',invitation:'Edit a column of A and watch its matching basis arrow move. Try a rotation, a shear, then a collapse. Does the square keep its area?',
 idea:'The first column is where (1, 0) goes. The second is where (0, 1) goes. Every other output is the same combination of those transformed basis vectors as the input was of the originals.',
 connection:'A dense layer computes Wx + b. Multiplication by W is linear; adding a nonzero bias makes the full layer affine. Learned query, key, and value projections are matrix multiplications. Stacking fixed linear maps gives another linear map; nonlinear activations let a network represent a richer family of functions.',
 math:[
 ['Columns are transformed basis vectors','Ax = x₁a₁ + ⋯ + xₙaₙ','If A is m×n, it maps an n-dimensional column vector to an m-dimensional column vector. Multiplication is defined only when the inner dimensions agree.'],
 ['Linearity is a pair of promises','A(αx + βy) = αAx + βAy','This follows coordinate by coordinate from distributivity. Linear maps preserve sums and scalar multiples. A map with a nonzero bias fails the origin test: f(0) ≠ 0.'],
 ['Composition and transpose','B(Ax) = (BA)x,   (BA)ᵀ = AᵀBᵀ','If A is m×n and B is p×m, BA is p×n. The rightmost operation acts first. In general AB ≠ BA; one product may not even be defined.'],
 ['Signed area and invertibility','det A = a₁₁a₂₂ − a₁₂a₂₁','For a 2×2 real map, |det A| is the area scale and its sign records orientation. A is invertible exactly when det A ≠ 0. In larger dimensions, the determinant measures signed volume scale.']
 ],
 proof:{title:'Why composition reverses under transpose',claim:'For compatible real matrices A and B, (BA)ᵀ = AᵀBᵀ.',steps:[
 ['Let A ∈ ℝᵐˣⁿ and B ∈ ℝᵖˣᵐ.','Both sides of the proposed identity have shape n×p. Shape agreement is necessary, but not sufficient.'],
 ['[(BA)ᵀ]ᵢⱼ = (BA)ⱼᵢ = Σₖ Bⱼₖ Aₖᵢ','Transpose swaps indices; multiplication sums over the shared dimension m.'],
 ['Σₖ Aᵀᵢₖ Bᵀₖⱼ = [AᵀBᵀ]ᵢⱼ','Scalar multiplication commutes, allowing each term to be reordered.'],
 ['(BA)ᵀ = AᵀBᵀ','The entries agree for every i and j, proving matrix equality.']
 ],limit:'You can reorder individual scalar factors, but not the matrices themselves. The reversed order is essential to both the shapes and the identity.'},
 prediction:{question:'A has columns (2, 0) and (1, 1). Where does x = (1, 2) go?',choices:['(2, 3)','(4, 2)','(3, 2)'],answer:1,feedback:'Ax = 1·(2, 0) + 2·(1, 1) = (4, 2). The input coordinates weight the columns.'},
 transfer:{question:'X is n×d and W is d×k. What is the shape of XW?',choices:['d×d','n×k','k×n'],answer:1,feedback:'The shared d dimension is summed out. Each of the n input rows becomes a row with k features.'}
},
{
 id:'rank',group:1,title:'Bases, rank & null spaces',subtitle:'Count independent directions, not entries.',
 lead:'Two vectors do not necessarily give you two directions. When one is a scaled copy of the other, their combinations can reach only a line.',
 experiment:'Make a dimension disappear',invitation:'Move the second column until it lies on the first. Use “Make dependent” to hit the exact case. Watch the transformed square collapse.',
 idea:'Rank counts reachable independent output directions. A collapsed input direction becomes invisible: adding a vector from the null space changes the input but leaves the output unchanged.',
 connection:'A weight update ΔW = BA with an intermediate width r has rank at most r. LoRA learns such factors while keeping the original weights fixed. The large resulting matrix can still have a small rank.',
 math:[
 ['A basis has no redundant direction','x = Bc','A basis spans a vector space and is linearly independent, so each vector has unique coordinates c in that basis. For a full basis of ℝᵈ, B is invertible and c = B⁻¹x. Coordinates change; the underlying vector does not.'],
 ['Image and kernel','im A = {Ax},   ker A = {x : Ax = 0}','The image (column space) contains all reachable outputs. Its dimension is rank A. The kernel (null space) contains all invisible inputs. Both are subspaces: they contain zero and are closed under linear combinations.'],
 ['Rank–nullity','rank A + dim ker A = n','For A ∈ ℝᵐˣⁿ, the domain has n dimensions. Each is accounted for by either an independent output direction or a lost input direction. Full column rank means ker A = {0}; it does not require m = n.'],
 ['A bottleneck bounds rank','rank(BA) ≤ min(rank A, rank B)','If A is r×n and B is m×r, the entire output is built from r columns of B. Therefore rank(BA) ≤ r, however large m and n are.']
 ],
 proof:{title:'Why a low-rank update really has low rank',claim:'For B ∈ ℝᵈˣʳ and A ∈ ℝʳˣᵏ, rank(BA) ≤ r.',steps:[
 ['Take any x ∈ ℝᵏ. Then Ax ∈ ℝʳ.','A compresses the input into r coordinates.'],
 ['BAx = Σᵢ₌₁ʳ (Ax)ᵢ bᵢ','Multiplication by B is a combination of its r columns.'],
 ['im(BA) ⊆ span{b₁, …, b_r} = im B','Every output lies in a subspace spanned by at most r vectors.'],
 ['rank(BA) ≤ rank B ≤ r','Dimension cannot increase when you restrict to a subspace.']
 ],limit:'This bounds the rank of the update, not the final W + BA. A full-rank base matrix generally stays full rank after adding a low-rank update.'},
 prediction:{question:'A has columns (2, 1) and (1, ½). What is its rank?',choices:['0','1','2'],answer:1,feedback:'The second column is half the first. There is one independent direction, and the vector (−1, 2) maps to zero.'},
 transfer:{question:'W is a full-rank 100×100 matrix and ΔW = BA uses r = 4. What is guaranteed?',choices:['rank(W + ΔW) ≤ 4','rank(ΔW) ≤ 4','rank(ΔW) = 4'],answer:1,feedback:'The factorization bounds only the update, and its factors could themselves be rank deficient. No equality or rank-4 bound on W + ΔW follows.'}
},
{
 id:'projections',group:1,title:'Projections & least squares',subtitle:'Find the closest point you can reach.',
 lead:'Suppose your model can produce only points on a line, but the target is off that line. Which reachable point gives the smallest error?',
 experiment:'Fit a line to a target',invitation:'Rotate the reachable line. The target x stays fixed. Find a position where the dashed error vector is perpendicular to the line.',
 idea:'The closest point is the orthogonal projection. Any other point adds an along-the-line error to a perpendicular error. By Pythagoras, that can only increase the squared distance.',
 connection:'Linear regression finds the prediction in the column space of a design matrix that is closest to the targets. Projection also helps describe which part of a representation lies in a chosen subspace.',
 math:[
 ['Projection onto one direction','projᵤ(x) = u(uᵀx)/(uᵀu)','Assume u ≠ 0. The scalar coefficient chooses the position along u. If u is a unit vector, the denominator is 1. The residual r = x − projᵤ(x) satisfies uᵀr = 0.'],
 ['A projection matrix','P = uuᵀ/(uᵀu),   P² = P,   Pᵀ = P','Idempotence means projecting twice has the same result as projecting once. Symmetry distinguishes Euclidean orthogonal projection from other idempotent linear maps.'],
 ['Least squares and normal equations','min꜀ ‖Xc − y‖₂²   ⇒   XᵀXc = Xᵀy','At a minimum, the residual is perpendicular to every column of X. If X has independent columns, c = (XᵀX)⁻¹Xᵀy is unique. QR or SVD is usually preferable to explicitly forming an inverse in code.'],
 ['Dependent columns','c* = X⁺y','The Moore–Penrose pseudoinverse returns the minimum-norm least-squares solution. The fitted vector Xc* is unique even when the coefficient vector is not.']
 ],
 proof:{title:'Why perpendicular error gives the minimum',claim:'If p lies in a subspace S and r = x − p is orthogonal to S, then p is the unique closest point in S to x.',steps:[
 ['For any q ∈ S, x − q = (x − p) + (p − q).','Split the error through the proposed closest point p.'],
 ['rᵀ(p − q) = 0','Because S is a subspace, p − q ∈ S, while r is orthogonal to S.'],
 ['‖x − q‖₂² = ‖r‖₂² + ‖p − q‖₂²','Expand the square. The cross term vanishes by orthogonality.'],
 ['‖x − q‖₂² ≥ ‖r‖₂², with equality only if q = p.','The extra squared length is nonnegative and is zero exactly at p.']
 ],limit:'The argument assumes a linear subspace and the Euclidean norm. For an affine set, differences must lie in its direction subspace; for other norms, Euclidean perpendicularity need not characterize the minimum.'},
 prediction:{question:'Project x = (2, 3) onto the horizontal axis. What is the closest point?',choices:['(2, 0)','(0, 3)','(2, 3)'],answer:0,feedback:'The horizontal coordinate is already reachable. Only the vertical component must be discarded, leaving residual (0, 3).'},
 transfer:{question:'X has dependent columns. Which least-squares object is still unique?',choices:['Every coefficient vector','The fitted vector Xc','The ordinary inverse of XᵀX'],answer:1,feedback:'Several coefficient vectors can represent the same projection of y onto im X. The point in the column space is unique; the coefficients need not be.'}
},
{
 id:'eigenvectors',group:1,title:'Eigenvectors & stability',subtitle:'Find the directions a map does not turn.',
 lead:'Most arrows change direction under a matrix. A few special directions only stretch, shrink, or reverse. Repeated application makes these directions especially useful.',
 experiment:'Search for an invariant direction',invitation:'Rotate x until Ax lies on the same line. Then apply the map repeatedly. Compare 45° with −45° before increasing the step count.',
 idea:'For this symmetric matrix, the two eigenvectors are perpendicular. The 45° direction grows by 2 each step; the −45° direction shrinks by 0.8. A component along the growing direction eventually dominates unless it is exactly zero.',
 connection:'Eigenvalues describe how an update repeats near a fixed point. Covariance matrices have nonnegative eigenvalues; their eigenvectors define PCA directions. Arbitrary neural-network matrices need not be symmetric or have a real eigenbasis.',
 math:[
 ['A direction preserved by a map','Av = λv,   v ≠ 0','An eigenvector must be nonzero. Its eigenvalue λ is the signed scale factor. λ = 0 is allowed: a nonzero eigenvector can lie in the null space.'],
 ['Repeated maps','Aᵏv = λᵏv','When A has a full eigenbasis, decompose an input into those directions and raise each eigenvalue to the kth power. |λ| < 1 shrinks a component, |λ| > 1 grows it, and λ < 0 flips its sign at each step.'],
 ['The symmetric case','A = QΛQᵀ,   QᵀQ = I','The real spectral theorem applies to real symmetric matrices. The columns of Q form an orthonormal eigenbasis. A general square matrix may lack a full eigenbasis, and real matrices can have complex eigenvalues.'],
 ['Positive semidefinite means every quadratic value is nonnegative','xᵀAx ≥ 0 for all x','For real symmetric A, this is equivalent to all eigenvalues being nonnegative. A covariance matrix and AᵀA are positive semidefinite. The largest covariance eigenvalue identifies the direction of greatest centered variance.']
 ],
 proof:{title:'Distinct eigenvalues of a symmetric map are orthogonal',claim:'If A = Aᵀ, Au = λu, Av = μv, and λ ≠ μ, then uᵀv = 0.',steps:[
 ['uᵀAv = μuᵀv','Use the eigenvector equation for v.'],
 ['uᵀAv = (Au)ᵀv = λuᵀv','Symmetry lets A move across the inner product.'],
 ['(λ − μ)uᵀv = 0','Equate the two expressions and rearrange.'],
 ['uᵀv = 0','The eigenvalues differ, so λ − μ is nonzero.']
 ],limit:'Without symmetry this conclusion fails. Eigenvectors associated with a repeated eigenvalue need not already be orthogonal, although an orthonormal basis can be chosen within its eigenspace for a symmetric map.'},
 prediction:{question:'An eigenvector has λ = −½. After two applications, what is A²v?',choices:['−v','¼v','−¼v'],answer:1,feedback:'Each application multiplies by −½. Two applications give (−½)²v = ¼v, restoring the original direction.'},
 transfer:{question:'For any real matrix W, why is WᵀW positive semidefinite?',choices:['All entries are positive','xᵀWᵀWx = ‖Wx‖₂² ≥ 0','W must be invertible'],answer:1,feedback:'The quadratic form is a squared norm. Individual entries may be negative and W may have a null space.'}
},
{
 id:'svd',group:2,title:'SVD & low-rank structure',subtitle:'Rotate, stretch, rotate again.',
 lead:'Eigenvectors concern square maps that preserve directions. Singular value decomposition works for every real matrix, including rectangular maps, and reveals how much it stretches each independent input direction.',
 experiment:'Keep the strongest direction',invitation:'Switch between rank 2 and rank 1. Move the smaller singular value toward zero. How much does the rank-1 approximation lose?',
 idea:'A circle becomes an ellipse. Its semi-axis lengths are the singular values. Removing the smaller singular direction flattens the ellipse into a line; the discarded singular value is the worst-case error for unit inputs here.',
 connection:'Truncated SVD explains optimal low-rank approximation in matrix norms. LoRA also uses low-rank factors, but it learns an update from a task loss; it does not generally compute a truncated SVD of the original weights.',
 math:[
 ['The factorization','A = UΣVᵀ','For A ∈ ℝᵐˣⁿ, full U and V are orthogonal matrices of sizes m×m and n×n. Σ is m×n with nonnegative diagonal entries in decreasing order. Reduced forms keep only the necessary singular vectors.'],
 ['Input and output directions','Avᵢ = σᵢuᵢ,   AᵀAvᵢ = σᵢ²vᵢ','The right singular vector vᵢ is an input direction; uᵢ is the matching output direction. The nonzero singular values count rank. Zero singular values reveal lost directions.'],
 ['Two matrix norms','‖A‖₂ = σ₁,   ‖A‖ꜰ = √(Σᵢσᵢ²)','The spectral norm is the largest output length among unit inputs. The Frobenius norm is the square root of the sum of all squared entries. These are different quantities even though both are called norms.'],
 ['Discard weak directions','Aᵣ = Σᵢ₌₁ʳ σᵢuᵢvᵢᵀ','Eckart–Young–Mirsky: among rank-at-most-r matrices, truncation minimizes spectral and Frobenius error. The errors are σᵣ₊₁ and √(Σᵢ>ᵣ σᵢ²), respectively. For a 2×2 rank-1 truncation, both equal σ₂. For a centered n×d data matrix X with n > 1, the right singular vectors are PCA directions: the sample covariance XᵀX/(n − 1) has eigenvalues σᵢ²/(n − 1). Centering the data is essential to this covariance interpretation.']
 ],
 proof:{title:'The spectral norm is the largest singular value',claim:'For a nonzero real matrix A, sup over ‖x‖₂ = 1 of ‖Ax‖₂ equals σ₁.',steps:[
 ['Write x = Vc. Orthogonality gives ‖c‖₂ = ‖x‖₂ = 1.','Changing to the right-singular-vector basis preserves length.'],
 ['‖Ax‖₂² = ‖UΣc‖₂² = Σᵢσᵢ²cᵢ²','Orthogonal U also preserves length. Extra rectangular coordinates contribute zero.'],
 ['Σᵢσᵢ²cᵢ² ≤ σ₁²Σᵢcᵢ² = σ₁²','Bound each singular value by the largest one.'],
 ['Take x = v₁. Then ‖Av₁‖₂ = σ₁.','The upper bound is attained, so it is the exact supremum.']
 ],limit:'The zero matrix has spectral norm 0 directly. This proof is about a matrix norm; it does not say that every input is stretched by σ₁.'},
 prediction:{question:'A matrix has singular values 3 and 1. What is its best rank-1 spectral error?',choices:['0','1','3'],answer:1,feedback:'Discarding the second direction leaves error σ₂ = 1. Keeping the larger singular direction minimizes the worst-case unit-input error.'},
 transfer:{question:'A matrix has singular values 5, 3, 1. For rank-1 truncation, what are the spectral and Frobenius errors?',choices:['3 and √10','3 and 4','1 and √10'],answer:0,feedback:'The spectral error is the largest discarded value, 3. The Frobenius error combines all discarded squared values: √(3² + 1²) = √10.'}
},
{
 id:'gradients',group:2,title:'Gradients & backpropagation',subtitle:'Send a small change through a composition.',
 lead:'A derivative describes a local change. For a function with many inputs and outputs, collect those changes in a matrix: the Jacobian. Backpropagation applies these local maps in reverse order.',
 experiment:'Take a step down a loss surface',invitation:'Step through gradient descent. Increase the learning rate past 0.5, reset, and try again. Can a downhill-pointing gradient still lead to a larger loss after a finite step?',
 idea:'The gradient points in the direction of steepest local increase under Euclidean distance. A negative-gradient step is locally downhill, but a large finite step can overshoot. Here the vertical coordinate is more sensitive than the horizontal one.',
 connection:'Training computes a scalar loss, then gradients with respect to parameters. Reverse-mode differentiation propagates a vector–Jacobian product through the network. It avoids explicitly building the full Jacobian of a large model.',
 math:[
 ['From scalar derivative to Jacobian','f(x + δ) ≈ f(x) + Jꜰ(x)δ','For f: ℝⁿ → ℝᵐ, J is m×n with Jᵢⱼ = ∂fᵢ/∂xⱼ. This first-order approximation has a remainder that becomes small relative to ‖δ‖ as δ → 0 at a differentiable point.'],
 ['The gradient of a scalar loss','L(x + δ) ≈ L(x) + ∇L(x)ᵀδ','With column-vector gradients, ∇L is n×1 and Jᴸ = ∇Lᵀ. For this experiment, L(x, y) = ½(x² + 4y²), so ∇L = (x, 4y) and the Hessian is diag(1, 4).'],
 ['The chain rule','∇ₓL = Jꜰ(x)ᵀ ∇ᵧL,   y = f(x)','For y = Wx + b, Jꜰ = W and ∇ₓL = Wᵀ∇ᵧL. For several layers, apply the corresponding transposes in reverse order. Gradients and forward activations have distinct roles and shapes. For y = ReLU(Wx), where ReLU(t) = max(0, t) coordinatewise, the local Jacobian is DW: D has diagonal entry 1 for a positive preactivation and 0 for a negative one. At zero, ReLU is not differentiable; implementations choose a convention. Transformer MLPs often use other activations, but the same chain-rule structure applies.'],
 ['Step size has assumptions','xₜ₊₁ = xₜ − η∇L(xₜ)','For a positive-definite quadratic with largest Hessian eigenvalue λmax, fixed-step gradient descent converges for 0 < η < 2/λmax. Here that means 0 < η < 0.5. Real training losses are not globally this quadratic.']
 ],
 proof:{title:'Differentiate a linear least-squares loss',claim:'For L(w) = ½‖Xw − y‖₂², the gradient is Xᵀ(Xw − y).',steps:[
 ['Let r = Xw − y and perturb w by δ.','Use a displacement to identify the first-order change.'],
 ['L(w + δ) = ½‖r + Xδ‖₂²','A linear map sends the displacement to Xδ.'],
 ['L(w + δ) − L(w) = rᵀXδ + ½‖Xδ‖₂²','Expand the square. The second term is second order in δ.'],
 ['∇L(w) = Xᵀr = Xᵀ(Xw − y)','Match the first-order term to ∇L(w)ᵀδ. No inverse is needed.']
 ],limit:'This differentiable quadratic gives an exact global formula. Neural networks compose differentiable maps and sometimes nonsmooth operations, which require defined subgradient conventions at exceptional points.'},
 prediction:{question:'At (x, y) = (2, 1), with η = 0.1, where does one step go for L = ½(x² + 4y²)?',choices:['(1.8, 0.6)','(1.8, 0.9)','(2.2, 1.4)'],answer:0,feedback:'The gradient is (2, 4). Subtract 0.1 times that vector to obtain (1.8, 0.6).'},
 transfer:{question:'y = Wx, W is m×n, and ∇ᵧL is m×1. Which backward expression has the correct values and shape?',choices:['W∇ᵧL','Wᵀ∇ᵧL','∇ᵧL W'],answer:1,feedback:'Wᵀ is n×m, so the product is an n×1 gradient in input space. This is the transpose Jacobian acting on the output gradient.'}
},
{
 id:'softmax',group:2,title:'Probability & softmax',subtitle:'Turn scores into a distribution.',
 lead:'A model produces real-valued scores, but a next-token prediction needs nonnegative probabilities that sum to one. Softmax connects these two objects.',
 experiment:'Change confidence, keep the ranking',invitation:'Move the first logit, change temperature, then add 100 to every logit. Which changes the probabilities? Try equal logits too.',
 idea:'Exponentials make every finite-score probability positive. Dividing by their sum normalizes the distribution. A shared shift cancels; temperature changes relative score gaps and therefore confidence.',
 connection:'A language model turns vocabulary logits into next-token probabilities. Training commonly minimizes cross-entropy with the observed next token. Attention uses the same normalization over allowed keys.',
 math:[
 ['Normalization','pᵢ = exp(zᵢ/T) / Σⱼ exp(zⱼ/T),   T > 0','Subtract maxⱼ zⱼ before exponentiating for numerical stability; this leaves probabilities unchanged. Temperature is positive. With tied maxima, the T → 0 limit shares mass among the tied maxima.'],
 ['A probability-weighted quantity','𝔼ₚ[v] = Σᵢ pᵢvᵢ','Expectation is a weighted average, which may not equal any observed value. Attention computes this type of average over value vectors, with weights supplied by softmax scores.'],
 ['Cross-entropy and KL divergence','H(q, p) = −Σᵢqᵢ log pᵢ = H(q) + DKL(q ‖ p)','For a one-hot target t, cross-entropy reduces to −log pₜ. Natural logarithms give units of nats. KL is not symmetric and is not a distance metric. Terms with qᵢ = 0 contribute zero by convention.'],
 ['A useful derivative','∂pᵢ/∂zⱼ = pᵢ(δᵢⱼ − pⱼ)   at T = 1','The Kronecker delta δᵢⱼ equals 1 when i = j and 0 otherwise. The Jacobian is diag(p) − ppᵀ. For one-hot cross-entropy at T = 1, ∇z L = p − eₜ. At other temperatures, include a factor 1/T.']
 ],
 proof:{title:'Why a common logit shift changes nothing',claim:'For any finite real c and T > 0, softmax((z + c·1)/T) = softmax(z/T).',steps:[
 ['p′ᵢ = exp((zᵢ + c)/T) / Σⱼ exp((zⱼ + c)/T)','Write the shifted definition for one coordinate.'],
 ['exp((zᵢ + c)/T) = exp(c/T) exp(zᵢ/T)','Use exp(a + b) = exp(a)exp(b).'],
 ['p′ᵢ = exp(c/T)exp(zᵢ/T) / [exp(c/T)Σⱼexp(zⱼ/T)]','The same factor appears in every denominator term.'],
 ['p′ᵢ = pᵢ','Cancel the positive common factor. This justifies subtracting the maximum score in a stable implementation.']
 ],limit:'A shared additive shift cancels; a multiplicative scale generally does not. Very large shifts may still lose information if the inputs themselves exceed floating-point precision.'},
 prediction:{question:'All three logits are 0 at temperature 1. What probability does the first token receive?',choices:['0','⅓','1'],answer:1,feedback:'Each exponential is 1 and the denominator is 3. Equal scores produce a uniform distribution.'},
 transfer:{question:'At temperature 1, a target token has probability p = ¼. What is its cross-entropy loss?',choices:['¼','ln 4','−ln 4'],answer:1,feedback:'For a one-hot target, L = −ln p = −ln(¼) = ln 4 ≈ 1.386 nats. Increasing the target probability decreases this loss.'}
},
{
 id:'embeddings',group:3,title:'Embeddings & the residual stream',subtitle:'Follow a token into and out of vector space.',
 lead:'A token ID is a discrete index. An embedding table assigns that index a vector. The transformer updates vectors, then an output map turns a final hidden state into vocabulary scores.',
 experiment:'Read a vector back into tokens',invitation:'Select a token to inspect its embedding. Drag the hidden state h and watch all four vocabulary scores change. Can the highest-scoring token differ from the selected input?',
 idea:'An embedding lookup selects a row. Unembedding compares the hidden state with output directions using dot products. This teaching model ties the input and output tables; real models may use separate weights.',
 connection:'A decoder updates token representations through residual blocks. A simplified pre-normalized block has h′ = h + F(norm(h)). The residual addition requires matching dimensions. Normalization and nonlinear sublayers make the full block nonlinear.',
 math:[
 ['Discrete index, continuous representation','E ∈ ℝⱽˣᵈ,   xᵀ = eₜᵀE','A one-hot token column eₜ ∈ ℝⱽ selects row t of E. We use token rows in transformer batches: X ∈ ℝⁿˣᵈ. Here V is vocabulary size, n is token count, and d is feature width.'],
 ['From a hidden state to logits','z = Uh,   U ∈ ℝⱽˣᵈ,   h ∈ ℝᵈ','Each logit is a row of U dotted with h. Weight tying uses U = E in this column-vector convention. A bias can be added separately. Softmax then turns z into a distribution.'],
 ['Residual addition and normalization','h′ = h + F(norm(h))','LayerNorm subtracts the feature mean, divides by √(variance + ε), then applies learned per-feature scale and shift. RMSNorm uses a root-mean-square scale without subtracting the mean. Neither operation is generally linear.'],
 ['Attention needs position information','Xᵢ = E[tokenᵢ] + pᵢ','This is one position-encoding scheme, not a universal definition. Rotary position embeddings instead rotate query and key feature pairs as a function of position. A bare content-only attention map does not by itself encode token order.']
 ],
 proof:{title:'An embedding lookup is matrix multiplication',claim:'Multiplying a one-hot row eₜᵀ by E returns row t of E.',steps:[
 ['[eₜᵀE]ⱼ = Σᵢ₌₁ⱽ (eₜ)ᵢ Eᵢⱼ','Write one output feature j using the matrix-product definition.'],
 ['(eₜ)ᵢ = 1 if i = t, and 0 otherwise.','A one-hot vector contains exactly one nonzero coordinate.'],
 ['Σᵢ (eₜ)ᵢ Eᵢⱼ = Eₜⱼ','Every other term disappears.'],
 ['eₜᵀE = Eₜ,:','This holds for every feature j. A lookup implementation can select the row directly without materializing the one-hot vector.']
 ],limit:'The lookup identity does not make the overall language model linear. The token selection is discrete, and subsequent blocks use nonlinear operations and content-dependent attention.'},
 prediction:{question:'A vocabulary has V = 4 tokens and feature width d = 2. What is the embedding table shape?',choices:['2×4','4×2','4×4'],answer:1,feedback:'There is one row per token and two feature coordinates per row. Selecting one row returns a two-dimensional vector.'},
 transfer:{question:'Can a residual connection add h ∈ ℝ⁸ to F(h) ∈ ℝ⁴ directly?',choices:['Yes, addition broadcasts automatically','No, their feature dimensions must match','Yes, if both are normalized'],answer:1,feedback:'Vector addition needs matching dimensions. A projection could map the four-dimensional result to ℝ⁸, but that is an additional operation, not an automatic mathematical rule.'}
},
{
 id:'attention',group:3,title:'Self-attention, assembled',subtitle:'Score, normalize, mix.',
 lead:'You now have every ingredient: linear maps create query, key and value vectors; dot products create scores; softmax creates weights; a matrix product forms weighted sums.',
 experiment:'Trace one attention head',invitation:'Select a query token. Change temperature or the query projection. Turn on the causal mask and select “the”: which keys can it see?',
 idea:'Each query gets its own row of weights. The head mixes value vectors using that row. A causal mask removes future positions before normalization; it does not merely zero their weights after softmax.',
 connection:'Multiple heads use separate learned projections, concatenate their outputs, and apply an output map. A decoder block also includes residual additions, normalization, and a positionwise MLP. This lab isolates one head; its tiny numbers are teaching choices, not learned language behavior.',
 math:[
 ['Three projections, one shared input','Q = XWQ,   K = XWK,   V = XWV','For n token rows, X is n×d. WQ and WK are d×dₖ; WV is d×dᵥ. Q and K are n×dₖ while V is n×dᵥ. The lab uses d = dₖ = dᵥ = 2.'],
 ['A score for every query–key pair','S = QKᵀ/√dₖ + M','S and the mask M are n×n. For causal attention, Mᵢⱼ is 0 when j ≤ i and −∞ otherwise. If query/key coordinates are independent, zero-mean, unit-variance, the unscaled dot product has variance dₖ; division by √dₖ keeps that variance at 1. Those assumptions matter.'],
 ['Normalize rows, then mix','P = softmax_rows(S/T),   O = PV','Each allowed row sums to one. O is n×dᵥ. Standard scaled dot-product attention uses T = 1; this lab exposes temperature for experiments. The nonlinearity enters through softmax and because Q and K depend on X.'],
 ['From one head to a block','MultiHead(X) = concat(O₁, …, Oₕ)WO','If each head has value width dᵥ, concatenation has width h·dᵥ and WO maps it back to d. A full decoder requires position information and further sublayers; this lab does not implement a complete model.']
 ],
 proof:{title:'An attention output lies in the value convex hull',claim:'For a row with at least one allowed finite score, oᵢ is a convex combination of the allowed value vectors.',steps:[
 ['For allowed j, pᵢⱼ = exp(sᵢⱼ)/Σₖ allowed exp(sᵢₖ).','At temperature 1, finite scores yield positive exponentials. Masked positions receive exactly zero weight.'],
 ['pᵢⱼ ≥ 0 and Σⱼpᵢⱼ = 1','Normalization makes a probability distribution over allowed keys.'],
 ['oᵢ = Σⱼpᵢⱼvⱼ','This is exactly row i of PV.'],
 ['oᵢ ∈ conv{vⱼ : j allowed}','A convex hull is the set of all nonnegative weighted sums whose weights total one. This bounds each output coordinate.']
 ],limit:'The statement concerns one head before its output projection and residual addition. It does not bound the final transformer output to the convex hull of the original token embeddings. An entirely masked row is undefined.'},
 prediction:{question:'With a causal mask, how many keys can the first token attend to, counting itself?',choices:['0','1','3'],answer:1,feedback:'Only its own position is allowed. Its weight is exactly 1, so the attention output equals its own value vector.'},
 transfer:{question:'QKᵀ has rank at most dₖ. Must row-wise softmax(QKᵀ) also have rank at most dₖ?',choices:['Yes, all operations preserve rank','No, softmax is nonlinear','Only for a square matrix'],answer:1,feedback:'Rank bounds for products of linear maps do not pass through arbitrary nonlinear operations. For dₖ = 1, scores [[0,0],[0,1]] have rank 1, but row-softmax gives two independent rows and rank 2.'}
},
{
 id:'proofs',group:3,title:'From equations to proofs',subtitle:'Track shapes, assumptions and inequalities.',
 lead:'A proof becomes easier to read when each line has a job. First identify the objects and their shapes. Then name the definition, identity or inequality that justifies each transition.',
 experiment:'Follow a perturbation through two maps',invitation:'Rotate the input displacement δ. Compare its actual final length with the norm bound. Is the bound always attained? Change each map’s largest stretch.',
 idea:'An operator norm bounds the largest possible stretch across all directions. Multiplying worst-case stretches gives a valid composition bound, even when the worst-case direction of one map is poorly aligned with the next.',
 connection:'Sensitivity and stability arguments often bound how a change in hidden state affects later states. Residual bounds, low-rank claims and softmax identities reuse the earlier chapters. Full LLM proofs may also need probability, optimization, concentration and architecture-specific assumptions.',
 math:[
 ['A reusable reading routine','objects → shapes → assumptions → each justified step','Write the dimensions beside every matrix. Identify whether a norm is Euclidean, spectral or Frobenius. Distinguish exact equality, approximation and upper bound. Check that divisions, logarithms and inverses are defined.'],
 ['The induced norm bound','‖Ax‖₂ ≤ ‖A‖₂‖x‖₂','For x ≠ 0, divide x by its length and use the definition of spectral norm. For x = 0 the result is immediate. This is the bridge from vector geometry to a dimension-independent matrix inequality.'],
 ['Composition and residual bounds','‖BA‖₂ ≤ ‖B‖₂‖A‖₂,   ‖I + A‖₂ ≤ 1 + ‖A‖₂','Submultiplicativity follows by applying the induced bound twice. The residual bound uses the triangle inequality. These are upper bounds and may be loose. A residual block can amplify changes even when its update branch is small.'],
 ['Beyond a fixed linear map','‖F(x) − F(y)‖₂ ≤ L‖x − y‖₂','This defines an L-Lipschitz map on a stated domain. A uniform Jacobian norm bound on a convex domain gives such a bound for a differentiable F. Content-dependent attention requires controlling how its weights change too; treating P as fixed is a different claim.']
 ],
 proof:{title:'Bound a residual block’s sensitivity',claim:'If F is L-Lipschitz on a domain, then R(x) = x + F(x) is at most (1 + L)-Lipschitz on that domain.',steps:[
 ['R(x) − R(y) = (x − y) + (F(x) − F(y))','Expand the definition at both inputs. The same F and the same domain are used.'],
 ['‖R(x) − R(y)‖₂ ≤ ‖x − y‖₂ + ‖F(x) − F(y)‖₂','Apply the triangle inequality to the two displacement vectors.'],
 ['≤ ‖x − y‖₂ + L‖x − y‖₂','Use the assumed Lipschitz bound on F. This is where the hypothesis enters.'],
 ['= (1 + L)‖x − y‖₂','Factor the shared input distance. The conclusion is an upper bound, not an equality or a convergence guarantee.']
 ],limit:'An L-Lipschitz update does not imply an L-Lipschitz residual block. For F(x) = Lx with L ≥ 0, the residual has exact Lipschitz constant 1 + L, so this general bound cannot be improved.'},
 prediction:{question:'If ‖A‖₂ = 2, ‖B‖₂ = 3 and ‖δ‖₂ = 0.1, what can you conclude about ‖BAδ‖₂?',choices:['It equals 0.6','It is at most 0.6','It is at least 0.6'],answer:1,feedback:'Apply the induced norm bound twice: ‖BAδ‖ ≤ ‖B‖‖A‖‖δ‖ = 0.6. Alignment can make the actual change smaller.'},
 transfer:{question:'A paper claims “rank(QKᵀ) ≤ dₖ, therefore the full attention layer is a rank-dₖ linear map of X.” What is the gap?',choices:['The rank product inequality is false','Softmax and input-dependent Q, K make the layer nonlinear','V always has full rank'],answer:1,feedback:'The initial score rank bound is valid. The conclusion silently drops row-wise softmax and the dependence of Q, K and V on X. Both must be analyzed before making claims about the full map.'}
}
];
root.LAContent={lessons,groups:[{title:'The foundations',description:'Vectors, geometry, and linear maps',start:0,end:3},{title:'The structure',description:'Subspaces, projections, and eigenvectors',start:3,end:6},{title:'The machinery',description:'Decomposition, derivatives, and probability',start:6,end:9},{title:'The language model',description:'Representations, attention, and proofs',start:9,end:12}]};
})(window);
