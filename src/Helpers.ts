import { enemyTypes } from "./Shared.js";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEnemyType(): string {
    return Object.keys(enemyTypes)[Math.floor(Math.random() * Object.keys(enemyTypes).length)];
}
