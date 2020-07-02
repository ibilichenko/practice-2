function getExpeditionsTargets(commandSeries) {
  const result = [];
  const ship = {
    directions: ['top', 'left', 'bottom', 'right'],
    indexOfCurrDirection: 0,
    x: 0,
    y: 0,
    go(distance) {
      switch (this.directions[this.indexOfCurrDirection]) {
        case 'top': this.y += distance;
          break;
        case 'left': this.x -= distance;
          break;
        case 'bottom': this.y -= distance;
          break;
        case 'right': this.x += distance;
          break;
        default: break;
      }
    },
    turn(direction) {
      if (direction === 'left') {
        this.indexOfCurrDirection++;
        if (this.indexOfCurrDirection === 4) { this.indexOfCurrDirection = 0; }
      } else {
        this.indexOfCurrDirection--;
        if (this.indexOfCurrDirection === -1) { this.indexOfCurrDirection = 3; }
      }
    }
        
  };
  for (const arrayOfCommands of commandSeries) {
    ship.indexOfCurrDirection = 0;
    ship.x = 0;
    ship.y = 0;
    const commandsInCorrectOrder = [];
    let minValue = Infinity;
    arrayOfCommands.forEach(currentCommand => {
      if (currentCommand.order < minValue) {
        minValue = currentCommand.order;
      }
    });
    arrayOfCommands.forEach(currentCommand => {
      commandsInCorrectOrder[currentCommand.order - minValue] = currentCommand.command;
    });
    commandsInCorrectOrder.forEach(currentCommand => {
      if (currentCommand.includes('go')) {
        ship.go(+currentCommand.slice(3));
      }
      if (currentCommand.includes('turn')) {
        ship.turn(currentCommand.slice(5));
      }
    });
    result.push({ x: ship.x, y: ship.y });
  }

  return result;
}

export default function boundingRover(commandSeries) {
  const coordsList = getExpeditionsTargets(commandSeries);

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
