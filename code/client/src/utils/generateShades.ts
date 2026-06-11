export const generateShades = (hex: string, variation: number): string => {
  // Convert hex to RGB
  const hexToRgb = (hex: string): any => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  };

  // Generate a random number within the variation range
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Ensure value is within RGB bounds (0-255)
  const clamp = (value: number): number => {
    return Math.max(0, Math.min(255, value));
  };

  // Generate color variations
  const [r, g, b] = hexToRgb(hex);
  const newR = clamp(r + getRandomInt(-variation, variation));
  const newG = clamp(g + getRandomInt(-variation, variation));
  const newB = clamp(b + getRandomInt(-variation, variation));

  return rgbToHex(newR, newG, newB);
};
