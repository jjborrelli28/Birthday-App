export function cc(...classNames: (string | boolean)[]) {
  return classNames
    .filter((className) => typeof className === "string")
    .join(" ");
}
