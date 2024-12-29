import { capitalizeFirstLetter } from "./Helpers.js";
import { enemyList, wall, weaponList } from "./States.js";
export const upgradeTypes = {
    increaseDamage: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Damage +`,
        values: { normal: 5, rare: 7, legendary: 10, ancient: 15 },
        upgradeFunction: (weapon, amount) => {
            weapon.setDamage(weapon.getDamage() * (1 + amount / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weapon, amount) => {
            return `Increase ${weapon.getName()}'s damage by ${amount}%`;
        },
        icon: ``,
    },
    increaseAttackSpeed: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Attack Speed +`,
        values: { normal: 5, rare: 7, legendary: 10, ancient: 12 },
        upgradeFunction: (weapon, amount) => {
            weapon.setAttackSpeed(weapon.getAttackSpeed() * (1 + amount / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weapon, amount) => {
            return `Increase ${weapon.getName()}'s attack speed by ${amount}%`;
        },
        icon: ``,
    },
    increaseRange: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Range +`,
        values: { normal: 5, rare: 10, legendary: 15, ancient: 20 },
        upgradeFunction: (weapon, amount) => {
            weapon.setWeaponRange(weapon.getWeaponRange() * (1 + amount / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weapon, amount) => {
            return `Increase ${weapon.getName()}'s attack range by ${amount}%`;
        },
        icon: ``,
    },
    increaseProjectileCount: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Projectile Count +`,
        values: { normal: 1, rare: 1, legendary: 2, ancient: 3 },
        upgradeFunction: (weapon, amount) => {
            weapon.setProjectileCount(weapon.getProjectileCount() + amount);
            weapon.setDamage(weapon.getDamage() * 0.7);
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weapon, amount) => {
            return `Increase ${weapon.getName()}'s projectile count by ${amount}, but reduces the damage dealt by 30%`;
        },
        icon: ``,
    },
    increaseProjectileSpeed: {
        upgradeNameLabel: (weaponName) => `${capitalizeFirstLetter(weaponName)} Projectile Speed +`,
        values: { normal: 2, rare: 5, legendary: 7, ancient: 10 },
        upgradeFunction: (weapon, amount) => {
            weapon.setProjectileSpeed(weapon.getProjectileSpeed() * (1 + amount / 100));
            weapon.setLevel(weapon.getLevel() + 1);
        },
        description: (weapon, amount) => {
            return `Increase ${weapon.getName()}'s projectile speed by ${amount}%`;
        },
        icon: ``,
    },
    increaseXpDrops: {
        upgradeNameLabel: (weaponName) => `XP +`,
        values: { normal: 5, rare: 10, legendary: 12, ancient: 15 },
        upgradeFunction: (weapon, amount) => {
            enemyList.map((enemy) => enemy.setXpDrop(enemy.getXpDrop() * (1 + amount / 100)));
        },
        description: (weapon, amount) => {
            return `Increase XP dropped by monsters by ${amount}%`;
        },
        icon: ``,
    },
    decreaseMonsterMovementSpeed: {
        upgradeNameLabel: (weaponName) => `Monster Movement Speed -`,
        values: { normal: 2, rare: 4, legendary: 5, ancient: 10 },
        upgradeFunction: (weapon, amount) => {
            enemyList.map((enemy) => enemy.setMovementSpeed(enemy.getMovementSpeed() * (1 - amount / 100)));
        },
        description: (weapon, amount) => {
            return `Decreases movement speed of all monsters by ${amount}%`;
        },
        icon: ``,
    },
    getNewWeapon: {
        upgradeNameLabel: (weaponName) => `New Weapon: ${capitalizeFirstLetter(weaponName)}`,
        values: { normal: 0, rare: 0, legendary: 0, ancient: 0 },
        upgradeFunction: (weapon, amount) => {
            weaponList.push(weapon);
        },
        description: (weapon, amount) => {
            return `Acquire new weapon : ${capitalizeFirstLetter(weapon.getName())} - ${weapon.getDescription()}`;
        },
        icon: ``,
    },
    repairWall: {
        upgradeNameLabel: (weaponName) => `Repair Wall`,
        values: { normal: 5, rare: 10, legendary: 12, ancient: 15 },
        upgradeFunction: (weapon, amount) => {
            wall.setCurrentHealth(wall.getCurrentHealth() * (1 + amount / 100));
        },
        description: (weapon, amount) => {
            return `Repair the wall by ${amount}%`;
        },
        icon: ``,
    },
};
export const upgradeWeights = {
    normal: 70,
    rare: 20,
    legendary: 5,
    ancient: 2,
};
