
export default function runRover(commandsList) {

    const directions = ["north", "east", "south", "west"];

    function move(pos, command) {
        const steps = Number(command.command.substr(3));
        const newPos = Object.assign({}, pos);
        switch (directions[pos.dir]) {
            case "north":
                newPos.y += steps;
                break;
            case "east":
                newPos.x += steps;
                break;
            case "south":
                newPos.y -= steps;
                break;
            case "west":
                newPos.x -= steps;
                break;
            default:
        }
        return newPos;
    }

    // pos, command => new-pos
    function applyCommand(pos, command) {
        const newPos = Object.assign({}, pos);

        switch (command.command) {
            case "turn right":
                newPos.dir = (newPos.dir + 1) % 4;
                break;
            case "turn left":
                newPos.dir = (newPos.dir + 3) % 4;
                break;
            default:
                return move(newPos, command);
        }
        return newPos;
    }

    function filterBadCommands(command) {
        return command.command === "turn right" || command.command === "turn left" || command.command.indexOf("go") === 0
    }

    const position = commandsList
        .sort((a, b) => a.order - b.order)
        .filter(filterBadCommands)
        .reduce(applyCommand, {
            x: 0,
            y: 0,
            dir: 0
        });

    return {
        x: position.x,
        y: position.y
    };
}
