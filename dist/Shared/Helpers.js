import { Bow } from "../Classes/Weapons/Bow.js";
import { FireWand } from "../Classes/Weapons/FireWand.js";
import { Kunai } from "../Classes/Weapons/Kunai.js";
import { enemyTypes } from "./Enemies.js";
import { weaponList } from "./States.js";
import { upgradeTypes, upgradeWeights } from "./Upgrades.js";
import { weaponTypes } from "./Weapons.js";
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomEnemyType() {
    const enemyTypesArray = Object.entries(enemyTypes);
    const totalChance = enemyTypesArray.reduce((sum, [_, enemy]) => sum + enemy.chanceToSpawnPercentage, 0);
    let randomChance = Math.random() * totalChance;
    for (const [type, enemy] of enemyTypesArray) {
        if (randomChance < enemy.chanceToSpawnPercentage) {
            return type;
        }
        randomChance -= enemy.chanceToSpawnPercentage;
    }
    // Fallback in case of rounding errors
    return enemyTypesArray[0][0];
}
export function pickRandomWeapon() {
    return weaponList[getRandomInt(0, weaponList.length - 1)];
}
export function generateRandomWeapon() {
    var _a;
    const usedWeapons = weaponList.map((weapon) => weapon.getName());
    const availableWeapons = Object.keys(weaponTypes).filter((weaponName) => !usedWeapons.includes(weaponName));
    if (availableWeapons.length === 0) {
        return false;
    }
    const randomWeaponName = (_a = weaponTypes[availableWeapons[getRandomInt(0, availableWeapons.length)]]) === null || _a === void 0 ? void 0 : _a.name;
    switch (randomWeaponName) {
        case "bow":
            return new Bow();
        case "fireWand":
            return new FireWand();
        case "kunai":
            return new Kunai();
        default:
            return false; //no weapons available ignore
    }
}
export function getRandomUpgrade(includeGetNewWeapon = true) {
    let upgradeKeys = Object.keys(upgradeTypes);
    if (!includeGetNewWeapon) {
        upgradeKeys = upgradeKeys.filter((key) => key !== "getNewWeapon");
    }
    if (upgradeKeys.length === 0) {
        throw new Error("No upgrade types available.");
    }
    const randomKey = upgradeKeys[Math.floor(Math.random() * upgradeKeys.length)];
    const upgradeValues = upgradeTypes[randomKey].values;
    const upgradeNameLabel = upgradeTypes[randomKey].upgradeNameLabel;
    const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues);
    const upgradeIncrease = upgradeValues[upgradeRarity];
    const upgradeFunction = upgradeTypes[randomKey].upgradeFunction;
    const upgradeDescription = upgradeTypes[randomKey].description;
    const upgradeIcon = upgradeTypes[randomKey].icon;
    return {
        upgradeName: randomKey,
        upgradeNameLabel,
        upgradeRarity,
        upgradeIncrease,
        upgradeFunction,
        upgradeDescription,
        upgradeIcon,
    };
}
export function getThreeRandomUpgrades() {
    const upgrades = new Set();
    while (upgrades.size < 3) {
        const upgrade = getRandomUpgrade();
        upgrades.add(upgrade.upgradeName);
    }
    return Array.from(upgrades).map((upgradeName) => {
        const upgrade = upgradeTypes[upgradeName];
        const upgradeValues = upgrade.values;
        const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues);
        return {
            upgradeName,
            upgradeNameLabel: upgrade.upgradeNameLabel,
            upgradeRarity,
            upgradeIncrease: upgradeValues[upgradeRarity],
            upgradeFunction: upgrade.upgradeFunction,
            upgradeDescription: upgrade.description,
            upgradeIcon: upgrade.icon,
        };
    });
}
export function rollSelectedUpgradeRarity(upgrade) {
    const totalWeight = Object.values(upgradeWeights).reduce((sum, weight) => sum + weight, 0);
    const roll = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (const [rarity, weight] of Object.entries(upgradeWeights)) {
        cumulativeWeight += weight;
        if (roll <= cumulativeWeight) {
            return rarity;
        }
    }
    throw new Error("Failed to determine upgrade rarity. Check the weights.");
}
export function capitalizeFirstLetter(word) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
