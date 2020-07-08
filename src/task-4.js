export default function runRover(commandsList) {
  commandsList.sort((a, b) => a.order - b.order);
  const result = commandsList.reduce((acc, currentCommand) => {
    return moveAndTurn(currentCommand, acc);
  }, { x: 0, y: 0, directionIndex: 0 });

  return {
    x: result.x,
    y: result.y
  };
}

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
