
export default function boundingRect(coordsList) {
  let top = -Infinity;
  let bottom = Infinity;
  let left = Infinity;
  let right = -Infinity;
   
  // eslint-disable-next-line array-callback-return
  coordsList.map(currentValue => {
    if (top < currentValue.y) {
      top = currentValue.y;
    }
    if (bottom > currentValue.y) {
      bottom = currentValue.y;
    }
    if (left > currentValue.x) {
      left = currentValue.x;
    }
    if (right < currentValue.x) {
      right = currentValue.x;
    }
  });

  return {
    top: isFinite(top) ? top : 0,
    right: isFinite(right) ? right : 0,
    bottom: isFinite(bottom) ? bottom : 0,
    left: isFinite(left) ? left : 0
  };
}
