export function handler(fn) {
  return (...args) => fn(...args).catch(args[2]);
}
