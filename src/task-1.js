
export default function sum(...values) {
    
    return values.reduce((accumulator, currentValue) => accumulator + currentValue);
}
