# Project brief

This repository contains a static birthday/50th-anniversary web experience called "Martin, at 50". It is a lightweight single-page game with a gallery, puzzle unlock flow, notes panel, and Firebase-backed progression.

## Product overview
- `index.html` is the main experience: a 3x3 photo gallery where each tile can be unlocked by entering the correct answer in the header form.
- The gallery uses a lock/unlock state driven by Firebase Realtime Database values under `tiles/{number}`.
- When certain tiles are unlocked, the page reveals additional navigation to Puzzle 2 and the crossword puzzle.
- A notes side panel saves plain text to `notes` and keeps the note alive across resets.
- The project is intended to be a static web app for a personal celebration, not a framework application.

## Stack and runtime
- Frontend: HTML5, CSS, and vanilla JavaScript
- Runtime model: browser-only static site; no build step, bundler, or framework
- Data layer: Firebase Realtime Database using the Firebase JavaScript SDK
- Styling: custom CSS with Google Fonts and a minimal editorial design
- Assets: local gallery photo directories (`MartinsOwnImages/` and `NotMartinsImages/`) plus external Unsplash imagery used in the main gallery

## Current pages
- `index.html` — home page, photo gallery, answer form, notes panel, Firebase sync
- `puzzle2.html` — image-selection puzzle that marks `puzzle2Visited` as true when visited
- `lorem.html` — text puzzle revealed after the eight outer gallery tiles are unlocked
- `crossword.html` — crossword puzzle with per-row entries saved at `crossword/rows/<row>`
- `firebase-setup.html` — admin/reset helper that clears gameplay state while preserving `notes`
- `PROJECT.md` — repo reference for stack, conventions, and state model

## Firebase data model
The app uses a shared Firebase Realtime Database with the following keys:
- `notes` — user text notes
- `tiles/<tileNumber>` — boolean unlock state for each gallery tile, numbered from 1 to 9
- `puzzle2Visited` — boolean that reveals the Puzzle 2 link when true
- `crossword/rows/<rowNumber>` — string values storing crossword progress

The app assumes these paths are used consistently. Do not rename them unless the corresponding app logic is updated at the same time.

## Game logic and puzzle conventions
- The gallery answers live in `tileAnswers` inside `index.html` and map to tile numbers using 1-based Firebase paths.
- The array is zero-based, while the database tile keys are one-based: array index `n` corresponds to `tiles/<n + 1>`.
- When changing a gallery answer or tile unlock mapping, verify the position, tile number, and Firebase path all remain consistent.
- The middle gallery tile is tile 5 and its answer is `eureka`. The link to `lorem.html` appears when tiles 1–4 and 6–9 are unlocked.
- `puzzle2.html` is a direct root-level page and should stay reachable at `/puzzle2.html` in a static host.
- `crossword.html` complements the gallery and is unlocked after the relevant tile state is set in Firebase.
- `firebase-setup.html` resets progress for the gallery, Puzzle 2, and crossword while preserving notes and unrelated data.

## Repository conventions
- Keep the app dependency-light and static unless a strong reason exists to add tooling.
- Prefer small, readable, semantic HTML/CSS/JavaScript over abstraction layers.
- Keep behavior explicit and DOM-driven; use Firebase refs directly rather than complex state frameworks.
- Preserve responsiveness and accessibility: focus states, keyboard usability, `aria-*` labels, and mobile-friendly layout.
- Keep the visual language minimal and editorial: clean borders, serif/sans pairing, warm paper tones, and restrained motion.
- Communicate in English only in code comments, commit messages, and documentation.

## AI contribution guidance
- Read this file and the relevant existing source before making changes.
- Make the smallest safe fix or feature addition that matches the current design and state model.
- Avoid assuming a framework, build pipeline, or host-specific routing behavior without checking the actual files.
- For new puzzle or route additions, create a root-level HTML page and verify the title, file path, and navigation behavior.
- When resetting the game, use `firebase-setup.html` and confirm that `tiles/1` through `tiles/9`, `puzzle2Visited`, and `crossword/rows` are reset while `notes` remains intact.
- Do not introduce bundlers or package managers unless the project truly outgrows its static-site structure.

## Puzzle 2 image folders
- `image-list.json` supplies the image filenames used by `puzzle2.html`.
- `.github/workflows/update-image-list.yml` regenerates that list whenever files are pushed to `MartinsOwnImages/` or `NotMartinsImages/`, so new images are included without editing the page.
- Supported image extensions are AVIF, GIF, JPEG, PNG, and WebP.

## Relevant references
- `index.html` — central interactive experience and game state
- `puzzle2.html` — Puzzle 2 page and image-selection flow
- `crossword.html` — crossword puzzle page and progress storage
- `firebase-setup.html` — reset helper for starting over
- `PROJECT.md` — documentation of repository conventions and state
