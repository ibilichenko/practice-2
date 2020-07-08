function moveAndTurn(command, accumulator) {
  if (command.command.includes('go')) {
    const distance = Number(command.command.slice(3))
    switch (accumulator.directionIndex) {
      case 0: accumulator.y += distance;
        break;
      case 1: accumulator.x -= distance;
        break;
      case 2: accumulator.y -= distance;
        break;
      case 3: accumulator.x += distance;
        break;
      default: break;
    }

    return accumulator;
  }
  if (command.command.includes('turn')) {
    const direction = command.command.slice(5)
    if (direction === 'left') {
      accumulator.directionIndex++;
      if (accumulator.directionIndex === 4) { accumulator.directionIndex = 0; }
    } else {
      accumulator.directionIndex--;
      if (accumulator.directionIndex === -1) { accumulator.directionIndex = 3; }
    }
  }
  
  return accumulator;
}

function getExpeditionsTargets(commandSeries) {
  const coordinateArr = commandSeries.reduce((accumulator, currentCommandSeries) => {
    currentCommandSeries.sort((a, b) => a.order - b.order);
    const result = currentCommandSeries.reduce((acc, command) => {
      return moveAndTurn(command, acc);
    }, { x: 0, y: 0, directionIndex: 0 });
    accumulator.push(result);
    
    return accumulator;
  }, []);

  return coordinateArr;
}

export default function boundingRover(commandSeries) {
  const coordsList = getExpeditionsTargets(commandSeries);
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
