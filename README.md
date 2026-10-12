# Aesthetic Website Showcase Video Template (Remotion + React)

A reusable vertical **9:16 cinematic showcase video (1080 × 1920, 60 FPS)** that takes your website screen recording and seamlessly composites it onto a real laptop display with exact 3D perspective projection, subtle cinematic camera motion, ambient glow, and elegant typography.

---

## 🚀 Quick Start

### 1. Preview in Remotion Studio
To open the interactive browser timeline preview:
```bash
npm run preview
```
This launches the studio at `http://localhost:3000` where you can scrub frames, adjust zoom, and inspect animations live.

### 2. Export Video
To render the final MP4:
```bash
npm run render
```
The finished video is exported to `out/showcase.mp4`.

For high-bitrate / archival export:
```bash
npm run render:hq
```

---

## 🎨 Reusable Template Configuration

All project-specific settings live in [`src/config.ts`](./src/config.ts). You never need to touch the core composition components when creating a new video!

```ts
// 1. Change the scene text overlay (supports multi-line strings with "\n")
export const TITLE_TEXT =
  "Portfolio so goated that it\nlanded an internship for my\nclient";

// Or any custom project title:
// export const TITLE_TEXT = "Designed & developed\nby me";

// 2. Point to your new screen recording (placed in /public/)
export const SCREEN_RECORDING_SRC = "screenRecording1.mp4";
export const RECORDING_WIDTH = 1600;
export const RECORDING_HEIGHT = 900;

// 3. Set duration (frames = duration_in_seconds * 60)
export const DURATION_IN_FRAMES = 569; // ~9.5 seconds at 60 FPS
```

---

## 📐 How the Screen Alignment Works

1. **3D Homography Matrix (`src/homography.ts`)**:
   Instead of a simple affine skew, a projective homography solver computes the exact 8-DOF perspective transformation mapping your screen recording's 4 corners onto the laptop's display quadrilateral using CSS `matrix3d(...)`.
2. **Sub-Pixel Bezel Protection**:
   A calibrated CSS `clip-path` polygon masks the screen recording exactly to the inner bezel boundary, preventing any pixel bleed over the laptop frame or keyboard.
3. **Unified Cinematic Camera Motion**:
   Both the background photograph and the embedded display are wrapped in a shared camera transform (slow vertical drift + subtle breathing zoom), ensuring zero desync or drift across all frames.
4. **Cinematic Realism**:
   Features a subtle screen glass glare overlay, an ambient light bloom around the laptop lid, and a cinematic corner vignette.
