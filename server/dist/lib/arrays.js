export function generateArray({ size, min = 1, max = 100 }) {
    const result = [];
    for (let i = 0; i < size; i += 1) {
        result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return result;
}
