export default function boundingRect(coordsList) {
  if (coordsList.length === 0) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  } else {
    return {
      top: coordsList.sort((a, b) => b.y - a.y)[0].y,
      bottom: coordsList.sort((a, b) => a.y - b.y)[0].y,
      left: coordsList.sort((a, b) => a.x - b.x)[0].x,
      right: coordsList.sort((a, b) => b.x - a.x)[0].x
    };
  }
}
