import { Player } from "./Classes/Player.js";
import { Wall } from "./Classes/Wall.js";
import { capitalizeFirstLetter } from "./Helpers.js";
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
        xpDrop: 10,
        chanceToSpawnPercentage: 60,
    },
    fast: {
        color: "green",
        width: 40,
        height: 40,
        health: 60,
        speed: 3,
        damage: 7,
        attackSpeed: 1.1,
        points: 5,
        xpDrop: 10,
        chanceToSpawnPercentage: 40,
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
        xpDrop: 20,
        chanceToSpawnPercentage: 10,
    },
    elite: {
        color: "purple",
        width: 100,
        height: 100,
        health: 500,
        speed: 0.5,
        damage: 50,
        attackSpeed: 0.5,
        points: 50,
        xpDrop: 50,
        chanceToSpawnPercentage: 5,
    },
    boss: {
        color: "orange",
        width: 400,
        height: 400,
        health: 5000,
        speed: 0.1,
        damage: 200,
        attackSpeed: 0.1,
        points: 500,
        xpDrop: 200,
        chanceToSpawnPercentage: 1,
    },
};
export const weaponTypes = {
    bow: {
        name: "bow",
        attackSpeed: 1,
        damage: 20,
        projectileSprite: "./dist/Art/Sprites/arrow.png",
        range: CANVAS_WIDTH * 0.6,
        projectileSpeed: 10,
    },
    fireWand: {
        name: "fireWand",
        attackSpeed: 0.3,
        damage: 100,
        projectileSprite: "./dist/Art/Sprites/fireBall.png",
        range: CANVAS_WIDTH * 0.9,
        projectileSpeed: 15,
    },
    kunai: {
        name: "kunai",
        attackSpeed: 2,
        damage: 10,
        projectileSprite: "./dist/Art/Sprites/kunai.png",
        range: CANVAS_WIDTH * 0.3,
        projectileSpeed: 6,
    },
};
export const upgradeTypes = {
    increaseDamage: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Damage +`,
        values: { normal: 5, rare: 7, legendary: 10, ancient: 15 },
        upgradeFunction: (weapon, amountPercentage) => {
            weapon.setDamage(weapon.getDamage() * (1 + amountPercentage / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weaponName, amount) => {
            return `Increase ${weaponName}'s damage by ${amount}%`;
        },
        icon: ``,
    },
    increaseAttackSpeed: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Attack Speed +`,
        values: { normal: 5, rare: 7, legendary: 10, ancient: 12 },
        upgradeFunction: (weapon, amountPercentage) => {
            weapon.setAttackSpeed(weapon.getAttackSpeed() * (1 + amountPercentage / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weaponName, amount) => {
            return `Increase ${weaponName}'s attack speed by ${amount}%`;
        },
        icon: ``,
    },
    increaseProjectileSpeed: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Projectile Speed +`,
        values: { normal: 2, rare: 5, legendary: 7, ancient: 10 },
        upgradeFunction: (weapon, amountPercentage) => {
            weapon.setProjectileSpeed(weapon.getProjectileSpeed() * (1 + amountPercentage / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weaponName, amount) => {
            return `Increase ${weaponName}'s projectile speed by ${amount}%`;
        },
        icon: ``,
    },
    increaseXpDrops: {
        upgradeNameLabel: (weaponName) => `XP +`,
        values: { normal: 5, rare: 10, legendary: 12, ancient: 15 },
        upgradeFunction: (weapon, amountPercentage) => {
            enemyList.map((enemy) => enemy.setXpDrop(enemy.getXpDrop() * (1 + amountPercentage / 100)));
        },
        description: (weaponName, amount) => {
            return `Increase XP dropped by monsters by ${amount}%`;
        },
        icon: ``,
    },
    decreaseMonsterMovementSpeed: {
        upgradeNameLabel: (weaponName) => `Monster Movement Speed -`,
        values: { normal: 2, rare: 4, legendary: 5, ancient: 10 },
        upgradeFunction: (weapon, amountPercentage) => {
            enemyList.map((enemy) => enemy.setMovementSpeed(enemy.getMovementSpeed() * (1 - amountPercentage / 100)));
        },
        description: (weaponName, amount) => {
            return `Decreases movement speed of all monsters by ${amount}%`;
        },
        icon: ``,
    },
    getNewWeapon: {
        upgradeNameLabel: (weaponName) => `New Weapon: ${capitalizeFirstLetter(weaponName)}`,
        values: { normal: 0, rare: 0, legendary: 0, ancient: 0 },
        upgradeFunction: (weapon, amountPercentage) => {
            weaponList.push(weapon);
        },
        description: (weaponName, amount) => {
            return `Acquire new weapon : ${capitalizeFirstLetter(weaponName)}`;
        },
        icon: ``,
    },
};
export const rarityColors = {
    normal: "#b0c4de",
    rare: "#293e6b",
    legendary: "#d46000",
    ancient: "#8b0000",
};
export const upgradeWeights = {
    normal: 70,
    rare: 20,
    legendary: 5,
    ancient: 2,
};
