export const colors: string[] = [
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

export function colorToBG(colorName: string): string {
  if (colorName === "white") {
    return "bg-white";
  }
  return `bg-${colorName}-100`;
}

export function colorToBorder(colorName: string): string {
  if (colorName === "white") {
    return "border-white";
  }

  return `border-${colorName}-800`;
}
