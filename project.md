# Project 28 — Pixel Color Picker

**Difficulty:** hard · **Category:** Camera · **Core demo:** ~20 min

## What you're building

A webcam-based color picker: the live camera feed is shown on screen, and clicking anywhere on it reads the exact color of that pixel and displays it as both an RGB value and a HEX code, with a visible color swatch.

## The 20-minute core (MVP)

- Show a live webcam feed
- Let the user click anywhere on the video
- Read the color of the pixel at that exact click location
- Display a swatch of that color plus its RGB and HEX values
- Handle denied/blocked camera permission with a message

## How it works (concept — no code)

- **Accessing the webcam:** call `navigator.mediaDevices.getUserMedia({ video: true })`, which returns a Promise resolving to a `MediaStream`; assign it to a `<video>` element's `srcObject` to show the live feed (requires user permission, and only works on secure contexts — `https` or `localhost`).
- **Capturing the frame for reading:** you cannot read pixel colors directly off a `<video>` element — draw the current video frame onto a same-sized (often hidden) `<canvas>` using the 2D context's `drawImage(video, 0, 0, width, height)` method, which "snapshots" whatever is currently playing.
- **Mapping a click to a pixel coordinate:** listen for a `click` event on the visible video (or an overlay positioned exactly on top of it). The event object gives `event.offsetX`/`event.offsetY` (position relative to the element clicked), which — if the video/canvas are the same size and unscaled — map directly to a pixel coordinate on the canvas. If the displayed element is scaled by CSS, you'll need to convert coordinates proportionally using the element's actual vs. displayed dimensions (`element.width` vs `element.clientWidth`).
- **Reading the pixel color:** use the canvas 2D context's `getImageData(x, y, 1, 1)` to grab just a single pixel's data — this returns a small array (`.data`) with exactly 4 numbers: red, green, blue, alpha (0–255 each).
- **Converting RGB to HEX:** each of the R, G, B numbers (0–255) needs to become a 2-digit hexadecimal string using `.toString(16)`, padded with a leading zero if needed (`.padStart(2, '0')`), then concatenated together with a leading `#` — this is string manipulation and math students already know, just applied to a new context.
- **Displaying the result:** set the swatch element's background color directly with the RGB or HEX value (`element.style.backgroundColor`), and put the text values into labels using `textContent`.

## What you'll use

- HTML/CSS: `<video>` feed, hidden `<canvas>`, floating swatch card with color preview box
- JavaScript: math (RGB→HEX conversion), string methods (`toString`, `padStart`), conditionals
- Browser APIs: `navigator.mediaDevices.getUserMedia`, `<canvas>` 2D context `drawImage` + `getImageData`, `click` event with `offsetX`/`offsetY`
- Public API (if any): none

## Design prompt (paste it → get a visual spec sheet → build from it)

Paste the prompt below into an AI/design tool that can output HTML (Claude, ChatGPT, v0, etc.). It returns a **single annotated design-spec sheet** — a picture of the screen with the exact pixel spacing, colors, and font sizes labeled on it, plus a per-component breakdown — so you can read every number and rebuild it yourself in plain HTML/CSS/JS. It's a spec to copy, **not** the finished app.

> Create a single self-contained HTML file that is an **annotated design-spec sheet** (like a Figma redline) for a webcam pixel color picker (click the video feed to sample a color and see its RGB/HEX values) — NOT a working app. Include: (1) a clean static mockup of the main screen with realistic placeholder content (full-viewport camera preview, floating swatch card, color swatch square, HEX/RGB display); (2) small labeled chips placed on the mockup marking the key spacing and sizes in pixels — padding, gaps, border-radius, main element sizes, and the biggest font size; (3) a **Colors** panel — each color as a swatch + hex code + what it is used for, and make sure body text stays at least 4.5:1 contrast against its background; (4) a **Typography** panel — each text element with its pixel font-size and weight; (5) a **Spacing & sizes** panel — max width, paddings, gaps, corner radii in px, plus one note on how the layout reflows on a narrow phone screen (a single breakpoint); (6) a **States** strip — small mini-mockups of the empty/first-load, loading, and error (or permission-denied) states, since the working app needs them; (7) a **Component-by-component breakdown** where each component shown in the mockup above gets its own small card listing all of its specs: width/height, padding, background hex, border and border-radius, and text color + font size + weight — so I can build one component at a time just by reading its card. Use the Manrope font for the mockup so it matches the style below, and keep the spec panels themselves in a clean readable sans-serif. Make it clean and beginner-friendly so someone who has coded for one month can read the numbers and implement it by looking. Style direction: clean, minimal, camera/photo-app feel with a bottom-sheet card. Do NOT include any interactivity, JavaScript, or real data — it is a static spec sheet I will read and rebuild by hand.

## Resources

- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
- https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event

## Stretch goals

- Add a "copy to clipboard" button using the Clipboard API for the HEX code
- Keep a history strip of the last 5 picked colors
- Show HSL values in addition to RGB/HEX
- Add a magnified zoom loupe around the cursor before clicking

## Skills it drills

- Math and string manipulation (RGB to HEX conversion)
- Conditionals and coordinate math
- Canvas pixel reading and camera APIs (new concepts, explained above)
- Event objects and coordinate properties (new concept, explained above)
