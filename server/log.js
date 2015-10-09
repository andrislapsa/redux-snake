import clc from "cli-color";

export function info(message) {
    write(message, () => clc.blue.bold);
}

export function error(message) {
    write(message, () => clc.redBright.bold);
}

export function debug(message) {
    write(message, () => clc.green);
}

export function write(message, formater) {
    // console.log(color);
    console.log(formater()(message));
}
