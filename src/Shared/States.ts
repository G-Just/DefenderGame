import { Enemy } from "../Classes/Enemy.js";
import { Player } from "../Classes/Player.js";
import { Projectile } from "../Classes/Projectile.js";
import { Wall } from "../Classes/Wall.js";
import { Weapon } from "../Classes/Weapon.js";

export const gameState = {
    score: 0,
    level: 1,
    currentXp: 0,
    xpToLevel: 30,
    enemiesKilled: 0,
    gameLost: false,
    gamePaused: false,
};

export const enemyList: Enemy[] = [];

export const weaponList: Weapon[] = [];

export const projectileList: Projectile[] = [];

export const player = new Player();

export const wall = new Wall();
