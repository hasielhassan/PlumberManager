# Workspace Customizations & Agent Guidelines

This workspace houses the React, HTML5 Canvas, and Vanilla CSS codebase for the PlumberManager pipeline editor. Use these rules and guidelines to preserve architecture patterns and prevent regressions.

> [!IMPORTANT]
> **Mandatory First Step for Agents**: You MUST read [README.md](../README.md) at the start of any session to align on the technical configuration, command guidelines, and widget embedding specs.
>
> **System Architecture Mapping**: Refer to [ARCHITECTURE.md](ARCHITECTURE.md) to locate directories and files for specific modifications (Canvas rendering, event pipelines, export engines, formatting registry, properties editing, and widget embeds).

---

## 1. Styling & Theme System

* **Strictly Vanilla CSS**: Avoid using Tailwind classes or inline layout utilities (e.g., `flex`, `flex-col`, `w-[150px]`, `flex-1`) in React components unless explicitly defined in stylesheets. The project uses standard CSS modules and stylesheets.
* **Tokens & Variables**: Refer to the CSS variables in the theme system. Use `var(--ds-bg-app)`, `var(--ds-bg-sidebar)`, `var(--ds-border-color)`, and `var(--ds-color-accent)` to maintain color consistency.
* **Overlay Containers**: When implementing absolute overlays (e.g. dropdown lists or options menu boxes), ensure parent elements do not clip them. Set `overflow: visible` on collapsible panels and card lists, and elevate the active row's `z-index` on `:focus-within` or `:hover`.

---

## 2. Event-Driven Graph Model

* **Mutation Notifications**: The `GraphModel` does not automatically trigger component re-renders. After editing node attributes, renaming, color highlights, or moving items, you must emit the `node:moved` event:
  ```javascript
  graph.emit('node:moved', {});
  ```
* **Load Notifications**: When deserializing or loading a graph file, emit `graph:loaded` to trigger camera centering listeners:
  ```javascript
  graph.emit('graph:loaded', {});
  ```

---

## 3. Canvas Rendering & Hit Testing

* **Top-Left Coordinate Translation**: Dagre layout coords correspond to element centers. Translate these to top-left coords for drawing on the canvas:
  ```javascript
  const drawX = dagreNode.x - dagreNode.width / 2;
  const drawY = dagreNode.y - dagreNode.height / 2;
  ```
* **Z-Indexing (Backdrops First)**: Backdrop groups (`node.preset === 'node_preset_backdrop'`) must be sorted and drawn **before** normal nodes in the canvas loop to prevent them from rendering on top of processes and connection curves.
* **Canvas Markdown Note Parser**: Note blocks (`node.preset === 'node_preset_note'`) render body descriptions by splitting lines and parsing headings (`#`), list bullets (`- ` or `* `), and bold text (`**text**`) manually using HTML Canvas text drawing.
* **Note Color Contrast (YIQ)**: When note colors are changed, calculate readable title/body text colors dynamically using YIQ luminance check:
  ```javascript
  const r = parseInt(hex.substring(1,3), 16);
  const g = parseInt(hex.substring(3,5), 16);
  const b = parseInt(hex.substring(5,7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  const noteTextColor = yiq >= 128 ? 'rgba(50, 40, 10, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  ```

---

## 4. Backdrop Grouping Interactions

* **Dynamic Resizing**: Selected backdrop groups feature a resize grabber at the bottom-right corner. The mouse interaction machine tracks `DRAG_RESIZE_BACKDROP` states to write new sizes into `node.metadata.width` and `node.metadata.height`.
* **Drag-Along Translations**: When a backdrop group is dragged, hit-test all non-backdrop nodes. Translate the position of all nodes currently situated inside the backdrop container's dimensions in lockstep.
* **Compound Subgraph Auto-Layout**: The layout engine uses `dagre` compound settings. Nodes inside a backdrop must be nested in the layout graph:
  ```javascript
  g.setParent(nodeName, parentBackdropName);
  ```
  Dagre automatically calculates the resulting parent group size to wrap its children, which should then be read and saved back to the backdrop's metadata.

---

## 5. Linked Notes to Processes

* **Virtual Edges**: To keep notes close to their linked process nodes during auto-layouts, establish a high-weight virtual edge in the layout tree:
  ```javascript
  g.setEdge(linkedProcessNodeName, noteNodeName, { minlen: 1, weight: 15 });
  ```

---

## 6. SVG Export Specifications

* **SVG Header Clipping**: Apply clip paths to rounded headers of process nodes. Sanitize IDs to avoid spaces and special characters:
  ```javascript
  const safeName = node.name.replace(/[^a-zA-Z0-9-_]/g, '_');
  // SVG clipPath id="clip-${safeName}"
  ```
* **SVG Backdrop Layout**: Render backdrop groups with semi-transparent backgrounds (`0.08` opacity), title bars (`0.25` opacity), and solid white text.
* **SVG Format Badges**: Compute connection Bezier curves' midpoints and render text badges centered on top of paths:
  ```javascript
  const mx = 0.125 * pSource.x + 0.375 * c1x + 0.375 * c2x + 0.125 * pTarget.x;
  const my = 0.125 * pSource.y + 0.375 * c1y + 0.375 * c2y + 0.125 * pTarget.y;
  ```

---

## 7. Command History & Undo/Redo

* **Action Transaction Wrap**: Graph mutations should be wrapped inside `executeAction()` to record snapshots of before and after states.
* **Textarea Changes Throttle**: Do not commit snapshots on every character keystroke inside name fields or details textareas. Maintain local React state immediately (forcing graph redraws), and commit a single consolidated history snapshot on input focus loss (`onBlur`).

---

## 8. General Engineering & Architecture Standards

Apply this as a standing baseline for every build. It sits underneath the specific brief — use it to fill in the *how* wherever the task doesn't spell it out:

### Priorities, in order, when tradeoffs arise

1. **Correctness** — it has to actually work, including edge cases, not just the happy path.
2. **Clarity & maintainability** — someone else (or you, in six months) can understand and safely change it.
3. **Consistency** — follow the existing patterns in the codebase/ecosystem instead of inventing a new way to do the same thing.
4. **Performance** — optimize only where a real bottleneck exists, not a guess.
5. **Brevity** — shorter is better, but only once everything above is satisfied.

### Architecture & design patterns

* Separate concerns into distinct layers/modules (e.g., presentation, business logic, data access) with clear, minimal-leakage boundaries.
* Keep coupling low and cohesion high — each module should have one reason to change.
* Favor composition over inheritance, and explicit dependencies over hidden global or shared state.
* Reach for a named design pattern only when it solves a real problem in this codebase — don't add abstraction "for later."
* Define clear interfaces/contracts between components so pieces can be tested, swapped, or scaled independently.
* Match the idiomatic architecture of the ecosystem in use rather than importing conventions from a different one.

### Code quality & readability

* Use descriptive, unambiguous names that follow the idioms of the language in use.
* Keep functions, classes, and files small and single-purpose; split anything doing more than one job.
* Apply DRY, but don't abstract prematurely — duplication is cheaper than the wrong abstraction.
* Use the standard formatter/linter for the language rather than an improvised house style.
* No magic numbers or strings — use named constants or config.
* Write self-documenting code first; comment the *why*, not the *what*.

### Maintainability & structure

* Use the project layout conventional for that ecosystem, not an improvised structure.
* Externalize configuration and secrets; never hardcode environment-specific values.
* Keep dependencies minimal, current, and justified — don't add a library for what a few lines of code can do.
* Write atomic commits with messages that explain intent, not just what changed.
* Document non-obvious decisions with a short README or docstring, not exhaustive prose nobody will read.

### Reliability & testing

* Validate input and handle errors explicitly at every boundary — never fail silently.
* Log meaningfully enough to debug production issues, without leaking sensitive data.
* Cover critical logic with automated tests (unit/integration as appropriate) as part of the deliverable, not an afterthought.
* Think through edge cases and failure modes up front, not after something breaks.

### Security

* Never hardcode credentials, tokens, or API keys.
* Treat all external input as untrusted; validate and sanitize it.
* Default to least privilege — don't request or grant more access than the task needs.
* Use vetted, maintained libraries for security-sensitive work (auth, crypto) instead of rolling your own.

### Hard boundaries

* Don't silently swallow or hide errors — surface them.
* Don't leave placeholder or TODO logic in anything presented as finished — flag incomplete pieces explicitly.
* Don't introduce a new library, pattern, or convention for something the codebase already handles, without calling it out.
* Don't optimize prematurely at the cost of readability.
* Don't skip validation at trust boundaries to save time.
* Don't claim something is tested, secure, or production-ready unless it actually meets the standards above.

**Bar to clear:** a competent engineer unfamiliar with this project should be able to open the code, understand the structure within minutes, and extend it safely without needing to ask the original author anything.
