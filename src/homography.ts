export interface Point {
  x: number;
  y: number;
}

export interface ScreenCorners {
  tl: Point;
  tr: Point;
  br: Point;
  bl: Point;
}

/**
 * Computes the 3D perspective homography matrix that maps a rectangle
 * of (srcWidth x srcHeight) precisely onto the 4 corners defined by targetCorners.
 * Returns a CSS `matrix3d(...)` string.
 */
export function getPerspectiveTransformMatrix(
  srcWidth: number,
  srcHeight: number,
  corners: ScreenCorners
): string {
  const src = [
    { x: 0, y: 0 },
    { x: srcWidth, y: 0 },
    { x: srcWidth, y: srcHeight },
    { x: 0, y: srcHeight },
  ];
  const dst = [corners.tl, corners.tr, corners.br, corners.bl];

  // Set up the 8x8 linear system: A * h = b
  // for projective transform:
  // x = (h00*u + h01*v + h02) / (h20*u + h21*v + 1)
  // y = (h10*u + h11*v + h12) / (h20*u + h21*v + 1)
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const { x: u, y: v } = src[i];
    const { x, y } = dst[i];
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    b.push(y);
  }

  // Solve 8x8 linear system using Gaussian elimination with partial pivoting
  const n = 8;
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
        maxRow = k;
      }
    }
    const tempA = A[i];
    A[i] = A[maxRow];
    A[maxRow] = tempA;

    const tempB = b[i];
    b[i] = b[maxRow];
    b[maxRow] = tempB;

    for (let k = i + 1; k < n; k++) {
      const c = A[k][i] / A[i][i];
      for (let j = i; j < n; j++) {
        A[k][j] -= c * A[i][j];
      }
      b[k] -= c * b[i];
    }
  }

  // Back substitution
  const h = new Array<number>(8);
  for (let i = n - 1; i >= 0; i--) {
    let sum = b[i];
    for (let j = i + 1; j < n; j++) {
      sum -= A[i][j] * h[j];
    }
    h[i] = sum / A[i][i];
  }

  const [h00, h01, h02, h10, h11, h12, h20, h21] = h;

  // CSS matrix3d is column-major:
  // [
  //   m00, m10, m20, m30,
  //   m01, m11, m21, m31,
  //   m02, m12, m22, m32,
  //   m03, m13, m23, m33
  // ]
  // In terms of 2D projective homography:
  // X = h00*u + h01*v + h02
  // Y = h10*u + h11*v + h12
  // W = h20*u + h21*v + 1
  return [
    `matrix3d(`,
    `${h00.toFixed(9)}, ${h10.toFixed(9)}, 0, ${h20.toFixed(9)}, `,
    `${h01.toFixed(9)}, ${h11.toFixed(9)}, 0, ${h21.toFixed(9)}, `,
    `0, 0, 1, 0, `,
    `${h02.toFixed(9)}, ${h12.toFixed(9)}, 0, 1)`,
  ].join("");
}
