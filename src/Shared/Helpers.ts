import { Bow } from "../Classes/Weapons/Bow.js";
import { FireWand } from "../Classes/Weapons/FireWand.js";
import { Kunai } from "../Classes/Weapons/Kunai.js";
import { Weapon } from "../Classes/Weapons/Weapon.js";
import { enemyTypes } from "./Enemies.js";
import { weaponList } from "./States.js";
import { Upgrade } from "./Types.js";
import { upgradeTypes, upgradeWeights } from "./Upgrades.js";
import { weaponTypes } from "./Weapons.js";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEnemyType(): string {
    const enemyTypesArray = Object.entries(enemyTypes);
    const totalChance = enemyTypesArray.reduce(
        (sum, [_, enemy]) => sum + enemy.chanceToSpawnPercentage,
        0
    );
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

export function pickRandomWeapon(): Weapon {
    return weaponList[getRandomInt(0, weaponList.length - 1)];
}

export function generateRandomWeapon(): Weapon | false {
    const usedWeapons: string[] = weaponList.map((weapon) => weapon.getName());
    const availableWeapons: string[] = Object.keys(weaponTypes).filter(
        (weaponName: string) => !usedWeapons.includes(weaponName)
    );

    if (availableWeapons.length === 0) {
        return false;
    }

    const randomWeaponName =
        weaponTypes[availableWeapons[getRandomInt(0, availableWeapons.length)]]?.name;
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

export function getRandomUpgrade(includeGetNewWeapon: boolean = true): {
    upgradeName: string;
    upgradeNameLabel: Function;
    upgradeRarity: string;
    upgradeIncrease: number;
    upgradeFunction: Function;
    upgradeDescription: Function;
    upgradeIcon: string;
} {
    let upgradeKeys = Object.keys(upgradeTypes);
    if (!includeGetNewWeapon) {
        upgradeKeys = upgradeKeys.filter((key) => key !== "getNewWeapon");
    }
    if (upgradeKeys.length === 0) {
        throw new Error("No upgrade types available.");
    }

    const randomKey = upgradeKeys[Math.floor(Math.random() * upgradeKeys.length)];
    const upgradeValues = upgradeTypes[randomKey].values as Upgrade;
    const upgradeNameLabel = upgradeTypes[randomKey].upgradeNameLabel as Function;
    const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues) as keyof Upgrade;
    const upgradeIncrease = upgradeValues[upgradeRarity];
    const upgradeFunction = upgradeTypes[randomKey].upgradeFunction as Function;
    const upgradeDescription = upgradeTypes[randomKey].description as Function;
    const upgradeIcon = upgradeTypes[randomKey].icon as string;

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
        const upgrade = upgradeTypes[upgradeName as keyof typeof upgradeTypes];
        const upgradeValues = upgrade.values as Upgrade;
        const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues) as keyof Upgrade;
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

export function rollSelectedUpgradeRarity(upgrade: Upgrade): string {
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

export function capitalizeFirstLetter(word: string) {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}
