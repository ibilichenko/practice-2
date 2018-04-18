
export default function createCounter(n) {
    let counter = -n;

    return function() {
        counter += n;
        return counter;
    };
}
