/**
 * config.ts — User configuration for the Cinematic Showcase Template.
 *
 * Customize everything here without touching core composition code:
 * 1. Change TITLE_TEXT to customize the text overlay in the scene.
 * 2. Put your screen recording video in /public/ and set SCREEN_RECORDING_SRC.
 * 3. Update RECORDING_WIDTH / RECORDING_HEIGHT if your video resolution is different.
 */

// ─── Editable Scene Text ──────────────────────────────────────────────────────

/**
 * The text overlay displayed in the warm sunset glow on the wall.
 * Supports multi-line strings with "\n".
 *
 * Example alternatives:
 *   "Designed & developed by me"
 *   "Built a high-converting\nlanding page for my client"
 */
export const TITLE_TEXT =
  "Portfolio so goated that it\nlanded an internship for my\nclient";

// ─── Screen Recording Media ───────────────────────────────────────────────────

/**
 * Name of your website recording MP4 inside the /public folder.
 */
export const SCREEN_RECORDING_SRC = "screenRecording1.mp4";

/** Width of the screen recording in pixels. */
export const RECORDING_WIDTH = 1600;

/** Height of the screen recording in pixels. */
export const RECORDING_HEIGHT = 900;

// ─── Background Scene ─────────────────────────────────────────────────────────

/**
 * Background scene photograph inside /public.
 * scene_clean.png is the high-res frame extracted directly from the reel,
 * with the screen display area prepared in solid dark-bezel tone to prevent
 * any white fringe / borders, and wall cleared for the editable title.
 */
export const BACKGROUND_IMAGE_SRC = "scene_clean.png";

// ─── Output Video Settings ────────────────────────────────────────────────────

/** Output video resolution (standard 9:16 vertical reel / story format). */
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

/** Target frame rate. */
export const VIDEO_FPS = 60;

/**
 * Total duration of the composition in frames.
 * At 60 FPS: 569 frames = ~9.48s (matches screenRecording1.mp4).
 */
export const DURATION_IN_FRAMES = 569;

// ─── Laptop Screen Perspective Corners (1080 × 1920) ──────────────────────────
/**
 * Exact sub-pixel coordinates of the laptop screen display boundaries,
 * calibrated from highQualityScene1.png:
 *   TL: (91.0, 1005.1)
 *   TR: (1024.2, 948.5)
 *   BR: (1068.5, 1638.6)
 *   BL: (46.9, 1603.2)
 */
export const SCREEN_CORNERS = {
  tl: { x: 91.0, y: 1005.1 },
  tr: { x: 1024.2, y: 948.5 },
  br: { x: 1068.5, y: 1638.6 },
  bl: { x: 46.9, y: 1603.2 },
} as const;
