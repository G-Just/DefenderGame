import { Enemy } from "./Classes/Enemy.js";
import { Player } from "./Classes/Player.js";
import { Wall } from "./Classes/Wall.js";
import { Weapon } from "./Classes/Weapons/Weapon.js";
import { Projectile } from "./Classes/Projectile.js";
import { LevelUp } from "./Classes/LevelUp.js";
import { capitalizeFirstLetter } from "./Helpers.js";

// ============ Types ============
export type GameState = {
    score: number;
    wallHealth: number;
    level: number;
    xp: number;
    enemiesKilled: number;
    gameLost: boolean;
    gameStarted: boolean;
};

export type EnemyType = {
    color: string;
    width: number;
    height: number;
    health: number;
    speed: number;
    damage: number;
    attackSpeed: number;
    points: number;
    xpDrop: number;
    chanceToSpawnPercentage: number;
};

export type WeaponType = {
    name: string;
    attackSpeed: number;
    damage: number;
    range: number;
    projectileSprite: string;
    projectileSpeed: number;
    projectileCount: number;
    weaponDescription: string;
};

export type Upgrade = {
    normal: number;
    rare: number;
    legendary: number;
    ancient: number;
};

// ============ Data ============
export const gameState = {
    score: 0,
    level: 1,
    currentXp: 0,
    xpToLevel: 30,
    enemiesKilled: 0,
    gameLost: false,
    gamePaused: false,
};

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;

export const pen = canvas.getContext("2d") as CanvasRenderingContext2D;

export const FPS = 60;

export const CANVAS_WIDTH = 1920;

export const CANVAS_HEIGHT = 950;

export const enemyList: Enemy[] = [];

export const weaponList: Weapon[] = [];

export const projectileList: Projectile[] = [];

export const player = new Player();

export const wall = new Wall();

export const enemyTypes: { [key: string]: EnemyType } = {
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

export const weaponTypes: { [key: string]: WeaponType } = {
    bow: {
        name: "bow",
        attackSpeed: 1,
        damage: 20,
        projectileSprite: "./dist/Art/Sprites/arrow.png",
        range: CANVAS_WIDTH * 0.6,
        projectileSpeed: 10,
        projectileCount: 2,
        weaponDescription: `Good all-rounder weapon`,
    },
    fireWand: {
        name: "fireWand",
        attackSpeed: 0.3,
        damage: 100,
        projectileSprite: "./dist/Art/Sprites/fireBall.png",
        range: CANVAS_WIDTH * 0.9,
        projectileSpeed: 15,
        projectileCount: 1,
        weaponDescription: `Powerful long range wand, slow casting`,
    },
    kunai: {
        name: "kunai",
        attackSpeed: 2,
        damage: 10,
        projectileSprite: "./dist/Art/Sprites/kunai.png",
        range: CANVAS_WIDTH * 0.3,
        projectileSpeed: 6,
        projectileCount: 1,
        weaponDescription: `Fast firing daggers with low damage`,
    },
};

export const upgradeTypes: { [key: string]: { [key: string]: Upgrade | LevelUp | string | Function } } =
    {
        increaseDamage: {
            upgradeNameLabel: (weaponName: string): string =>
                `${capitalizeFirstLetter(weaponName)} Damage +`,
            values: { normal: 5, rare: 7, legendary: 10, ancient: 15 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weapon.setDamage(weapon.getDamage() * (1 + amount / 100));
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s damage by ${amount}%`;
            },
            icon: ``,
        },
        increaseAttackSpeed: {
            upgradeNameLabel: (weaponName: string): string =>
                `${capitalizeFirstLetter(weaponName)} Attack Speed +`,
            values: { normal: 5, rare: 7, legendary: 10, ancient: 12 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weapon.setAttackSpeed(weapon.getAttackSpeed() * (1 + amount / 100));
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s attack speed by ${amount}%`;
            },
            icon: ``,
        },
        increaseRange: {
            upgradeNameLabel: (weaponName: string): string =>
                `${capitalizeFirstLetter(weaponName)} Range +`,
            values: { normal: 5, rare: 10, legendary: 15, ancient: 20 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weapon.setWeaponRange(weapon.getWeaponRange() * (1 + amount / 100));
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s attack range by ${amount}%`;
            },
            icon: ``,
        },
        increaseProjectileCount: {
            upgradeNameLabel: (weaponName: string): string =>
                `${capitalizeFirstLetter(weaponName)} Projectile Count +`,
            values: { normal: 1, rare: 1, legendary: 2, ancient: 3 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weapon.setProjectileCount(weapon.getProjectileCount() + amount);
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s projectile count by ${amount}%`;
            },
            icon: ``,
        },
        increaseProjectileSpeed: {
            upgradeNameLabel: (weaponName: string): string =>
                `${capitalizeFirstLetter(weaponName)} Projectile Speed +`,
            values: { normal: 2, rare: 5, legendary: 7, ancient: 10 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weapon.setProjectileSpeed(weapon.getProjectileSpeed() * (1 + amount / 100));
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s projectile speed by ${amount}%`;
            },
            icon: ``,
        },
        increaseXpDrops: {
            upgradeNameLabel: (weaponName: string): string => `XP +`,
            values: { normal: 5, rare: 10, legendary: 12, ancient: 15 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                enemyList.map((enemy) => enemy.setXpDrop(enemy.getXpDrop() * (1 + amount / 100)));
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase XP dropped by monsters by ${amount}%`;
            },
            icon: ``,
        },
        decreaseMonsterMovementSpeed: {
            upgradeNameLabel: (weaponName: string): string => `Monster Movement Speed -`,
            values: { normal: 2, rare: 4, legendary: 5, ancient: 10 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                enemyList.map((enemy) =>
                    enemy.setMovementSpeed(enemy.getMovementSpeed() * (1 - amount / 100))
                );
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Decreases movement speed of all monsters by ${amount}%`;
            },
            icon: ``,
        },
        getNewWeapon: {
            upgradeNameLabel: (weaponName: string): string =>
                `New Weapon: ${capitalizeFirstLetter(weaponName)}`,
            values: { normal: 0, rare: 0, legendary: 0, ancient: 0 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                weaponList.push(weapon);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Acquire new weapon : ${capitalizeFirstLetter(
                    weapon.getName()
                )} - ${weapon.getDescription()}`;
            },
            icon: ``,
        },
    };

export const rarityColors: { [key: string]: string } = {
    normal: "#b0c4de",
    rare: "#293e6b",
    legendary: "#d46000",
    ancient: "#8b0000",
};

export const upgradeWeights: { [key: string]: number } = {
    normal: 70,
    rare: 20,
    legendary: 5,
    ancient: 2,
};
