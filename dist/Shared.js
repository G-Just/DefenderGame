import { Player } from "./Classes/Player.js";
import { Wall } from "./Classes/Wall.js";
// ============ Data ============
export const gameState = {
    score: 0,
    level: 1,
    currentXp: 0,
    xpToLevel: 100,
    enemiesKilled: 0,
    gameLost: false,
    gamePaused: false,
};
export const canvas = document.getElementById("canvas");
export const pen = canvas.getContext("2d");
export const FPS = 60;
export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 950;
export const enemyList = [];
export const weaponList = [];
export const projectileList = [];
export const player = new Player();
export const wall = new Wall();
export const enemyTypes = {
    normal: {
        color: "red",
        width: 50,
        height: 50,
        health: 100,
        speed: 2,
        damage: 10,
        attackSpeed: 1,
        points: 5,
        xpDrop: 5,
    },
    fast: {
        color: "green",
        width: 40,
        height: 40,
        health: 80,
        speed: 3,
        damage: 7,
        attackSpeed: 1.1,
        points: 7,
        xpDrop: 7,
    },
    tank: {
        color: "blue",
        width: 70,
        height: 70,
        health: 200,
        speed: 1,
        damage: 20,
        attackSpeed: 0.7,
        points: 10,
        xpDrop: 10,
    },
    boss: {
        color: "purple",
        width: 100,
        height: 100,
        health: 500,
        speed: 0.5,
        damage: 50,
        attackSpeed: 0.5,
        points: 50,
        xpDrop: 50,
    },
};
export const weaponTypes = {
    bow: {
        attackSpeed: 1,
        damage: 20,
        projectileSprite: "./dist/Art/Sprites/arrow.png",
        range: CANVAS_WIDTH * 0.6,
        projectileSpeed: 10,
        level: 1,
    },
    fireWand: {
        attackSpeed: 0.3,
        damage: 100,
        projectileSprite: "./dist/Art/Sprites/fireBall.png",
        range: CANVAS_WIDTH * 0.9,
        projectileSpeed: 15,
        level: 1,
    },
    // needles: {}, // Shoots a barrage of needles in a cone, low damage high fire rate
};
export const upgrades = {
    increaseDamageNormal: { rarity: "normal", percentageIncrease: 10 },
    increaseDamageRare: { rarity: "rare", percentageIncrease: 20 },
    increaseDamageLegendary: { rarity: "legendary", percentageIncrease: 50 },
    increaseDamageAncient: { rarity: "ancient", percentageIncrease: 100 },
    increaseAttackSpeedNormal: { rarity: "normal", percentageIncrease: 20 },
    increaseAttackSpeedRare: { rarity: "rare", percentageIncrease: 40 },
    increaseAttackSpeedLegendary: { rarity: "legendary", percentageIncrease: 100 },
    increaseAttackSpeedAncient: { rarity: "ancient", percentageIncrease: 150 },
};
