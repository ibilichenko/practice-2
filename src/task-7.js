// import { max } from "lodash";

export default function getPolynomial(...coefficients) {
  const coefficientCounter = coefficients.length;
  let resultStr = '';
  let maxDegree = coefficientCounter - 1;
  // eslint-disable-next-line array-callback-return
  coefficients.map((currentElement, index) => {
    if (currentElement) {
      let number;
      if (currentElement === 1 && index !== coefficients.length - 1) {
        number = '';
      } else if (currentElement === -1) {
        number = '-';
      } else if (index !== 0 && currentElement > 0) {
        number = (resultStr === '') ? currentElement : `+${currentElement}`;
      } else if (index !== 0 && currentElement < 0) {
        number = currentElement;
      } else if (index === 0) {
        number = currentElement;
      }
      const x = maxDegree === 0 ? '' : 'x';

      const star = `${Math.abs(currentElement) !== 1 && maxDegree > 0 ? '*' : ''}`;
      const degree = `${maxDegree !== 0 && maxDegree !== 1 ? `^${maxDegree}` : ''}`;
      resultStr += number + star + x + degree;
      maxDegree--;
    } else {
      maxDegree--;
    }
  });

  return resultStr === '' ? 0 : resultStr;
}
