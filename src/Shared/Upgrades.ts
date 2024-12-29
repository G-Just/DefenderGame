import { LevelUp } from "../Classes/LevelUp.js";
import { Weapon } from "../Classes/Weapon.js";
import { capitalizeFirstLetter } from "./Helpers.js";
import { enemyList, wall, weaponList } from "./States.js";
import { Upgrade } from "./Types.js";

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
                weapon.setDamage(weapon.getDamage() * 0.7);
                weapon.setLevel(weapon.getLevel() + 1);
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Increase ${weapon.getName()}'s projectile count by ${amount}, but reduces the damage dealt by 30%`;
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
        repairWall: {
            upgradeNameLabel: (weaponName: string): string => `Repair Wall`,
            values: { normal: 5, rare: 10, legendary: 12, ancient: 15 },
            upgradeFunction: (weapon: Weapon, amount: number): void => {
                wall.setCurrentHealth(wall.getCurrentHealth() * (1 + amount / 100));
            },
            description: (weapon: Weapon, amount: number): string => {
                return `Repair the wall by ${amount}%`;
            },
            icon: ``,
        },
    };

export const upgradeWeights: { [key: string]: number } = {
    normal: 70,
    rare: 20,
    legendary: 5,
    ancient: 2,
};
