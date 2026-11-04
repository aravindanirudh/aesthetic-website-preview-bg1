import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Video,
  staticFile,
  Img,
} from "remotion";
import {
  TITLE_TEXT,
  SCREEN_RECORDING_SRC,
  RECORDING_WIDTH,
  RECORDING_HEIGHT,
  POSTER_VIDEO_SRC,
  POSTER_WIDTH,
  POSTER_HEIGHT,
  BACKGROUND_IMAGE_SRC,
  SCREEN_CORNERS,
  POSTER_CORNERS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
} from "./config";
import { getPerspectiveTransformMatrix } from "./homography";

// ─── Editable Cinematic Caption Overlay (Bottom part of image) ────────────────
const CaptionOverlay: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  if (!TITLE_TEXT) return null;

  const FADE_IN_FRAMES = Math.round(fps * 0.5);
  const FADE_OUT_START = Math.round(fps * 8.8);
  const FADE_OUT_FRAMES = Math.round(fps * 0.5);

  const opacity =
    frame < FADE_IN_FRAMES
      ? interpolate(frame, [0, FADE_IN_FRAMES], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateRight: "clamp",
        })
      : interpolate(
          frame,
          [FADE_OUT_START, FADE_OUT_START + FADE_OUT_FRAMES],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

  const translateY = interpolate(frame, [0, FADE_IN_FRAMES], [16, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <h1
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Syne', 'Arial Black', sans-serif",
          fontSize: 48,
          fontWeight: 900,
          color: "#FFBE1A",
          letterSpacing: "-0.015em",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.22,
          whiteSpace: "pre-line",
          maxWidth: 960,
          textShadow:
            "0 4px 18px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.8)",
          WebkitTextStroke: "1px rgba(0, 0, 0, 0.4)",
        }}
      >
        {TITLE_TEXT}
      </h1>
    </div>
  );
};

// ─── Subtle Screen Glow / Light Bloom ─────────────────────────────────────────
const ScreenGlow: React.FC = () => {
  const { tl, tr, br, bl } = SCREEN_CORNERS;
  const cx = (tl.x + tr.x + br.x + bl.x) / 4;
  const cy = (tl.y + tr.y + br.y + bl.y) / 4;
  const w = Math.max(tr.x - tl.x, br.x - bl.x) * 1.05;
  const h = Math.max(bl.y - tl.y, br.y - tr.y) * 1.05;

  return (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        background:
          "radial-gradient(ellipse at center, rgba(140, 180, 255, 0.08) 0%, rgba(255, 180, 100, 0.03) 50%, transparent 75%)",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

// ─── Main Composition ─────────────────────────────────────────────────────────
export const CinematicShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Compute 3D perspective homography matrix for the monitor screen recording
  const screenMatrix3d = useMemo(() => {
    return getPerspectiveTransformMatrix(
      RECORDING_WIDTH,
      RECORDING_HEIGHT,
      SCREEN_CORNERS
    );
  }, []);

  // Compute 3D perspective homography matrix for the poster video
  const posterMatrix3d = useMemo(() => {
    return getPerspectiveTransformMatrix(
      POSTER_WIDTH,
      POSTER_HEIGHT,
      POSTER_CORNERS
    );
  }, []);

  // Subtle camera drift and slow breathing zoom (coordinated scene motion)
  const drift = interpolate(frame, [0, fps * 9.5], [0, -10], {
    extrapolateRight: "clamp",
  });
  const breathe = interpolate(
    frame,
    [0, fps * 4.5, fps * 9.5],
    [1, 1.012, 1],
    {
      easing: Easing.inOut(Easing.sin),
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#060608", overflow: "hidden" }}>
      {/* ── Coordinated camera container: background + screen + poster move together ── */}
      <AbsoluteFill
        style={{
          transform: `scale(${breathe}) translateY(${drift}px)`,
          transformOrigin: "50% 60%",
        }}
      >
        {/* ── High-resolution background scene photograph ── */}
        <AbsoluteFill>
          <Img
            src={staticFile(BACKGROUND_IMAGE_SRC)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </AbsoluteFill>

        {/* ── High-precision anti-aliased SVG masks ── */}
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="softenMask" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
            <mask
              id="screenAntiAliasedMask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
            >
              <polygon
                points={`${SCREEN_CORNERS.tl.x},${SCREEN_CORNERS.tl.y} ${SCREEN_CORNERS.tr.x},${SCREEN_CORNERS.tr.y} ${SCREEN_CORNERS.br.x},${SCREEN_CORNERS.br.y} ${SCREEN_CORNERS.bl.x},${SCREEN_CORNERS.bl.y}`}
                fill="#ffffff"
                filter="url(#softenMask)"
              />
            </mask>
            <mask
              id="posterAntiAliasedMask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
            >
              <polygon
                points={`${POSTER_CORNERS.tl.x},${POSTER_CORNERS.tl.y} ${POSTER_CORNERS.tr.x},${POSTER_CORNERS.tr.y} ${POSTER_CORNERS.br.x},${POSTER_CORNERS.br.y} ${POSTER_CORNERS.bl.x},${POSTER_CORNERS.bl.y}`}
                fill="#ffffff"
                filter="url(#softenMask)"
              />
            </mask>
          </defs>
        </svg>

        {/* ── Wall Poster replacement container with exact frame anti-aliased mask ── */}
        <AbsoluteFill
          style={{
            WebkitMaskImage: "url(#posterAntiAliasedMask)",
            maskImage: "url(#posterAntiAliasedMask)",
            overflow: "hidden",
          }}
        >
          {/* Black backing for poster bed */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "#000",
            }}
          />
          {/* Poster video transformed in 3D perspective */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: POSTER_WIDTH,
              height: POSTER_HEIGHT,
              transformOrigin: "0 0",
              transform: posterMatrix3d,
              outline: "1px solid transparent",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <Video
              src={staticFile(POSTER_VIDEO_SRC)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "auto",
              }}
              volume={0}
              loop
            />
          </div>
          {/* Subtle poster frame glass reflection */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%, rgba(255,220,150,0.03) 100%)",
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          />
        </AbsoluteFill>

        {/* ── Monitor screen replacement container with exact bezel anti-aliased mask ── */}
        <AbsoluteFill
          style={{
            WebkitMaskImage: "url(#screenAntiAliasedMask)",
            maskImage: "url(#screenAntiAliasedMask)",
            overflow: "hidden",
          }}
        >
          {/* Black backing for screen bed (guarantees zero white borders) */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "#000",
            }}
          />
          {/* Monitor screen recording transformed in 3D perspective */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: RECORDING_WIDTH,
              height: RECORDING_HEIGHT,
              transformOrigin: "0 0",
              transform: screenMatrix3d,
              outline: "1px solid transparent",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <Video
              src={staticFile(SCREEN_RECORDING_SRC)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "auto",
              }}
              volume={0}
            />
          </div>
          {/* Subtle screen glass glare reflection */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 40%, rgba(255,180,80,0.03) 100%)",
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          />
        </AbsoluteFill>

        {/* ── Subtle ambient light bloom from monitor ── */}
        <ScreenGlow />

        {/* ── Editable Caption Overlay at Bottom ── */}
        <CaptionOverlay frame={frame} fps={fps} />
      </AbsoluteFill>

      {/* ── Cinematic corner vignette ── */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 80% 85% at 50% 50%, transparent 62%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
