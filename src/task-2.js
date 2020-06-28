
export default function createCounter(n) {
    let counter = 0;
    return function() {
        counter++;
        return (counter - 1) * n;
    };
}
