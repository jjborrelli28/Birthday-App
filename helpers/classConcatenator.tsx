export function cc() {
  const args = Array.prototype.slice.call(arguments);
  return args.join(" ");
}
