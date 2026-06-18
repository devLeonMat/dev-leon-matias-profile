/** Rotating accent palette (brucelabs.tech-style) for card top-borders and icon chips. */
export const accentColors = [
  "--accent-teal",
  "--accent-blue",
  "--accent-purple",
  "--accent-gold",
  "--accent-red",
  "--accent-cyan",
] as const;

/** Raw CSS var name (e.g. "--accent-teal") for the given rotation index. */
export function accentVarAt(index: number) {
  return accentColors[index % accentColors.length];
}

/** hsl() color string for the given rotation index, ready to use in inline styles. */
export function accentColorAt(index: number) {
  return `hsl(var(${accentVarAt(index)}))`;
}

/** hsl() color string with alpha, e.g. for tinted backgrounds. */
export function accentColorAlphaAt(index: number, alpha: number) {
  return `hsl(var(${accentVarAt(index)}) / ${alpha})`;
}

/** Style object that sets --card-accent-color, consumed by the .card-accent-top utility class. */
export function accentTopBorderStyle(index: number): React.CSSProperties {
  return { "--card-accent-color": `var(${accentVarAt(index)})` } as React.CSSProperties;
}
