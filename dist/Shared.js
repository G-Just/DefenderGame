import { Player } from "./Classes/Player.js";
import { Wall } from "./Classes/Wall.js";
import { LevelUp } from "./Classes/LevelUp.js";
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
        xpDrop: 50,
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
        xpDrop: 50,
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
        xpDrop: 50,
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
export const upgradeTypes = {
    increaseDamage: {
        values: { normal: 10, rare: 20, legendary: 50, ancient: 100 },
        method: LevelUp.increaseDamage,
        description: `Increase weapon damage by x%`,
        icon: `testICONstring`,
    },
    increaseAttackSpeed: {
        values: { normal: 20, rare: 40, legendary: 100, ancient: 150 },
        method: LevelUp.increaseAttackSpeed,
        description: `Increase weapon attack speed by x%`,
        icon: `testICONstring`,
    },
    increaseXpDrops: {
        values: { normal: 10, rare: 20, legendary: 40, ancient: 60 },
        method: LevelUp.increaseAttackSpeed,
        description: `Increase XP dropped from monsters by x%`,
        icon: `testICONstring`,
    },
    decreaseMonsterMovementSpeed: {
        values: { normal: 5, rare: 10, legendary: 15, ancient: 20 },
        method: LevelUp.decreaseMonsterMovementSpeed,
        description: `Decreases monster movement speed by x%`,
        icon: `testICONstring`,
    },
};
export const upgradeWeights = {
    normal: 70,
    rare: 20,
    legendary: 5,
    ancient: 2,
};
