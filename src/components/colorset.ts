export const colors: string[] = [
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

export const colorBGs: string[] = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-pink-100",
];

export const colorBorders: string[] = [
  "border-red-100",
  "border-yellow-100",
  "border-green-100",
  "border-blue-100",
  "border-purple-100",
  "border-pink-100",
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
