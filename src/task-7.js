function getTermStruct(coef, power) {
    const sign = getSign(coef),
        coefficient = getCoef(Math.abs(coef), power),
        xPower = getXPower(power),
        mulSign = coefficient && xPower ? "*" : "";

    return { sign, coefficient, xPower, mulSign };
}

function getSign(coef) {
    return coef < 0 ? "-" : "+";
}

function getCoef(coef, power) {
    return (coef === 1 && power !== 0) ? "" : `${coef}`;
}

function getXPower(power) {
    switch (power) {
        case 0: return "";
        case 1: return "x";
        default: return `x^${power}`;
    }
}

export default function getPolynomial(...coefficients) {
    const maxPower = coefficients.length - 1;

    const terms = coefficients.map((coef, index) =>
        getTermStruct(coef, maxPower - index)
    ).filter(term => term.coefficient !== "0");

    if (!terms.length) {
        return "0";
    }

    if (terms[0].sign === "+") {
        terms[0].sign = "";
    }

    return terms.map(term =>
        `${term.sign}${term.coefficient}${term.mulSign}${term.xPower}`
    ).join("");
}

/*
Вариант от знакомого
export default function getPolynomial(...coefficients) {
    let j = coefficients.length;

    const poly = coefficients.map(e => {
        j--;
        if (e === 0) {
            return null;
        }
        return {
            sign: (e > 0) ? "+" : "",
            coef: (Math.abs(e) === 1 && j > 0) ? "" : `${e}`,
            x: (j === 0) ? "" : `x${(j > 1) ? `^${j}` : ""}`
        };
    }).filter(e => e).reduce((p, c) => {
        const term = `${(p.length) ? c.sign : ""}${c.coef}${(c.coef.length && c.x.length) ? "*" : ""}${c.x}`;
        return `${p}${term}`;
    }, "");

    return (poly.length > 0) ? poly : "0";
}
*/
