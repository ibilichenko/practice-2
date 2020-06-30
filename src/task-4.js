
export default function runRover(commandsList) {
    const ship = {
        directions: ["top", "left", "bottom", "right"],
        indexOfCurrDirection: 0,
        // pair +
        // non pair -
        x: 0,
        y: 0,
        go(distance) {
            switch (this.directions[this.indexOfCurrDirection]) {
                case "top": this.y += distance;
                    break;
                case "left": this.x -= distance;
                    break;
                case "bottom": this.y -= distance;
                    break;
                case "right": this.x += distance;
                    break;
                default: break;
            }
        },
        turn(direction) {
            if (direction === "left") {
                this.indexOfCurrDirection++;
                if (this.indexOfCurrDirection === 4) { this.indexOfCurrDirection = 0; }
            } else {
                this.indexOfCurrDirection--;
                if (this.indexOfCurrDirection === -1) { this.indexOfCurrDirection = 3; }
            }
        }
    };
    const commandsInCorrectOrder = [];
    let minValue = Infinity;
    commandsList.forEach(currentCommand => {
        if (currentCommand.order < minValue) {
            minValue = currentCommand.order;
        }
    });
    commandsList.forEach(currentCommand => {
        commandsInCorrectOrder[currentCommand.order - minValue] = currentCommand.command;
    });
    console.log(commandsInCorrectOrder);

    commandsInCorrectOrder.forEach(currentCommand => {
        if (currentCommand.includes("go")) {
            
            ship.go(+currentCommand.slice(3));
        }
        if (currentCommand.includes("turn")) {
            ship.turn(currentCommand.slice(5));
        }
    });
    return {
        x: ship.x,
        y: ship.y
    };
}
