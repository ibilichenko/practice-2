export default function findPath(obj) {
    for (const [key, val] of Object.entries(obj)) {
        if (val === 15) {
            return key;
        }

        if (typeof val === "object") {
            const path = findPath(val);
            if (path) {
                return `${key}.${path}`;
            }
        }
    }
    return null;
}
