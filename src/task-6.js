
export default function findPath(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === 15) {
      return key;
    }
    if (typeof value === 'object') {
      const path = findPath(value);
      if (path) {
        return `${key}.${path}`
      }
    }
  }
}
