# Linear algebra for language models

An interactive refresher for someone returning to linear algebra after a first university course. Work from vectors to the operations, notation, and elementary proofs used in transformer papers.

**Open `index.html` in a browser.** No build, server, account, installation, or internet connection is needed. All code and fonts are local. You can also serve this folder with any static web server.

## The course

| Part | Chapters |
| --- | --- |
| The foundations | Vectors & combinations; dot products & norms; matrices & linear maps |
| The structure | Bases, rank & null spaces; projections & least squares; eigenvectors & stability |
| The machinery | SVD & low-rank structure; gradients & backpropagation; probability & softmax |
| The language model | Embeddings & the residual stream; self-attention; from equations to proofs |

Every chapter offers three views:

- **Build intuition:** a computed experiment with editable inputs, interpretation, LLM connection, and a prediction about a separate stated case.
- **The math:** definitions, dimensions, identities, and assumptions.
- **Proof workshop:** a four-step deductive argument, assumption checks, and a transfer question.

Plots use equal coordinate scales. Vector endpoints support pointer dragging and arrow keys; coordinate fields provide an alternative. Native range controls support keyboard input. Proofs are stepped manually and can be reset. There is no autoplay. Notation search opens with `?`. Completion is optional, never gates navigation, and is saved in localStorage where available. Clear it through About this course.

## Publish on GitHub Pages

The site uses relative asset paths and hash navigation, so both repository Pages (`username.github.io/repository/`) and custom domains work without a base-path change.

### Deploy with GitHub Actions (recommended)

1. Push the files to the `main` branch of a GitHub repository (or change the branch in `.github/workflows/pages.yml`).
2. Open **Settings → Pages** and set the source to **GitHub Actions**.
3. Run **Check and publish course to GitHub Pages** from the Actions tab, or push a new commit to `main`.
4. Check the workflow result and inspect the screenshots in its **browser-review** artifact.

The workflow installs the locked development dependencies, runs syntax/model/content checks, installs Chromium, exercises all chapters at seven viewport/motion profiles, verifies the packaged site, and deploys only after those checks succeed. Pull requests run the same checks without deploying. Failed browser assertions block publication; screenshots still need human review for readability.

The deployed site has zero runtime dependencies. No deployment was performed from this workspace. Workflow configuration follows the official [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Playwright CI setup](https://playwright.dev/docs/ci-intro).

### Manual branch deployment

You can instead choose **Deploy from a branch**, select your branch and **/ (root)** in Pages settings. This route bypasses the workflow checks, so run the browser suite and inspect its screenshots locally first.

## Development and checks

Node 22 or newer:

```sh
npm run check
npm test
```

For browser QA on a machine that permits Chromium:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run test:browser
```

The browser suite (required by the publishing workflow) opens the real site with `file://` while blocking network requests. It exercises all twelve chapters, all views, predictions, transfer cases, resets, navigation, pointer and keyboard input, reference search, and progress persistence. Seven viewport/motion profiles include mobile and reflow. It writes screenshots and `docs/qa/report.json`; inspect the images as well as the assertions. Playwright is used only for development.

See [verification notes](docs/VERIFICATION.md) for the checks actually completed in the authoring environment and the browser restriction encountered there. Browser tests are included but have not passed in that environment; the workflow must run them on GitHub before deployment.

## Files and scope

- `js/model.js`: pure numerical functions, usable in Node without a DOM.
- `js/lessons.js`: course prose, original proofs, prediction and transfer cases.
- `js/app.js`: navigation, lesson state, SVG rendering, and controls.
- `FIDELITY.md`: mathematical scope, simplifications, numerical tolerances, and sources.
- `tests/`: independent numerical/content checks and browser scenarios.
- `scripts/package-site.mjs`: copies only the deployable files to `_site/` and resolves their asset/document links. Run it with `npm run package`.

The site does not run or train an LLM. Attention and embeddings use tiny, hand-chosen arrays; their token names are labels, not empirical semantic results. The course prepares you to follow elementary norm, rank, and attention arguments. Research proofs may additionally require advanced probability, optimization, or architecture-specific results.

Design: a dark terminal-inspired interface, local monospace typography, grayscale surfaces, and one muted green accent for focus, active states, and results. Diagrams distinguish inputs and comparisons using labels and solid/dashed strokes.

Fonts: DejaVu Sans Mono, bundled locally with its Bitstream Vera license and attribution. All mathematical diagrams are generated by the site.
