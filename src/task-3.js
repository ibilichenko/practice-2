
/* eslint-disable func-style */
const min = list =>
    list.reduce((acc, val) => acc < val ? acc : val, Infinity);

const max = list =>
    list.reduce((acc, val) => acc > val ? acc : val, -Infinity);

const pluck = (list, propName) =>
    list.map(value => value[propName]);

export default function boundingRect(coordsList) {

    if (!coordsList.length) {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    }

    return {
        top: max(pluck(coordsList, "y")),
        right: max(pluck(coordsList, "x")),
        bottom: min(pluck(coordsList, "y")),
        left: min(pluck(coordsList, "x"))
    };
}
