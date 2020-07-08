export default function getPolynomial(...coefficients) {
  const result = coefficients.reduce((accumulator, currentElement, index) => {
    return createPolynomialElement(accumulator, currentElement, index, coefficients.length);
  }, { result: '', maxDegree: coefficients.length - 1 })

  return result.result === '' ? 0 : result.result;
}

function createPolynomialElement(accumulator, currentElement, index, seriesLength) {
  if (currentElement) {
    let number;
    if (currentElement === 1 && index !== seriesLength - 1) {
      number = '';
    } else if (currentElement === -1) {
      number = '-';
    } else if (index !== 0 && currentElement > 0) {
      number = (accumulator.result === '') ? currentElement : `+${currentElement}`;
    } else if (index !== 0 && currentElement < 0) {
      number = currentElement;
    } else if (index === 0) {
      number = currentElement;
    }
    
    const x = accumulator.maxDegree === 0 ? '' : 'x';
    const star = `${Math.abs(currentElement) !== 1 && accumulator.maxDegree > 0 ? '*' : ''}`;
    const degree = `${accumulator.maxDegree !== 0 && accumulator.maxDegree !== 1 ? `^${accumulator.maxDegree}` : ''}`;
    accumulator.result += number + star + x + degree;
  }
  accumulator.maxDegree--;

  return accumulator;
}
