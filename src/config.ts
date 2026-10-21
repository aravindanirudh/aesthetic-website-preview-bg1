/**
 * config.ts — User configuration for the Cinematic Showcase Template.
 *
 * Customize everything here without touching core composition code:
 * 1. Change TITLE_TEXT to customize the text overlay in the scene.
 * 2. Put your screen recording video in /public/ and set SCREEN_RECORDING_SRC.
 * 3. Put your poster video in /public/ and set POSTER_VIDEO_SRC.
 * 4. Update coordinates or dimensions if you use different media.
 */

// ─── Editable Scene Text ──────────────────────────────────────────────────────

/**
 * The text/caption overlay displayed at the bottom part of the scene.
 * Supports multi-line strings with "\n".
 */
export const TITLE_TEXT = "";

// ─── Monitor Screen Recording Media ──────────────────────────────────────────

/**
 * Name of your website recording MP4 inside the /public folder.
 */
export const SCREEN_RECORDING_SRC = "screenRecording1.mp4";

/** Width of the screen recording in pixels. */
export const RECORDING_WIDTH = 1080;

/** Height of the screen recording in pixels. */
export const RECORDING_HEIGHT = 608;

// ─── Poster Video Media ───────────────────────────────────────────────────────

/**
 * Name of your poster video MP4 inside the /public folder.
 */
export const POSTER_VIDEO_SRC = "poster_video.mp4";

/** Width of the poster video canvas in pixels (standard portrait 9:16). */
export const POSTER_WIDTH = 1080;

/** Height of the poster video canvas in pixels (standard portrait 9:16). */
export const POSTER_HEIGHT = 1920;

// ─── Background Scene ─────────────────────────────────────────────────────────

/**
 * Background scene photograph inside /public.
 */
export const BACKGROUND_IMAGE_SRC = "scene.png";

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

// ─── Monitor Screen Perspective Corners (1080 × 1920) ─────────────────────────
/**
 * Exact sub-pixel coordinates of the LG monitor display boundaries calibrated
 * from radial edge detection on the white monitor screen:
 *   TL: (164.4, 569.7)
 *   TR: (945.3, 615.4)
 *   BR: (945.3, 1022.8)
 *   BL: (167.5, 1053.3)
 */
export const SCREEN_CORNERS = {
  tl: { x: 165.3, y: 573.7 },
  tr: { x: 944.6, y: 615.1 },
  br: { x: 944.6, y: 1023.2 },
  bl: { x: 167.6, y: 1053.1 },
} as const;

// ─── Wall Poster Perspective Corners (1080 × 1920) ────────────────────────────
/**
 * Exact sub-pixel coordinates of the framed poster on the wall above the monitor:
 *   TL: (328.2, 42.5)
 *   TR: (633.5, 82.2)
 *   BR: (633.5, 487.8)
 *   BL: (328.2, 469.9)
 */
export const POSTER_CORNERS = {
  tl: { x: 328.2, y: 42.5 },
  tr: { x: 633.5, y: 82.2 },
  br: { x: 633.5, y: 487.8 },
  bl: { x: 328.2, y: 469.9 },
} as const;
