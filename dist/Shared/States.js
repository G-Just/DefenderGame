import { Player } from "../Classes/Player.js";
import { Wall } from "../Classes/Wall.js";
export const gameState = {
    score: 0,
    level: 1,
    currentXp: 0,
    xpToLevel: 30,
    enemiesKilled: 0,
    gameLost: false,
    gamePaused: false,
};
export const enemyList = [];
export const weaponList = [];
export const projectileList = [];
export const player = new Player();
export const wall = new Wall();
