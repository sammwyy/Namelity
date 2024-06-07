export interface Color {
  r: number;
  g: number;
  b: number;
}

export function createColorPalette(base: Color): Color[] {
  const palette: Color[] = [];
  for (let i = -2; i < 3; i++) {
    palette.push({
      r: Math.min(255, base.r + i * 10),
      g: Math.min(255, base.g + i * 10),
      b: Math.min(255, base.b + i * 10),
    });
  }
  return palette;
}
