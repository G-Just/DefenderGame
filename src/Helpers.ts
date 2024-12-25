import { Weapon } from "./Classes/Weapons/Weapon.js";
import { enemyTypes, Upgrade, upgradeTypes, upgradeWeights, weaponList } from "./Shared.js";

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

export function getRandomWeapon(): Weapon {
    return weaponList[getRandomInt(0, weaponList.length - 1)];
}

export function getThreeRandomUpgrades(): {
    upgradeName: string;
    upgradeNameLabel: Function;
    upgradeRarity: string;
    upgradeIncrease: number;
    upgradeFunction: Function;
    upgradeDescription: Function;
    upgradeIcon: string;
}[] {
    const upgradeKeys = Object.keys(upgradeTypes);
    if (upgradeKeys.length < 3) {
        throw new Error("Not enough upgrade types to select three unique upgrades.");
    }
    const selectedUpgrades = new Set<string>();

    while (selectedUpgrades.size < 3) {
        const randomKey = upgradeKeys[Math.floor(Math.random() * upgradeKeys.length)];
        selectedUpgrades.add(randomKey);
    }

    return Array.from(selectedUpgrades).map((upgradeName) => {
        const upgradeValues = upgradeTypes[upgradeName].values as Upgrade;
        const upgradeNameLabel = upgradeTypes[upgradeName].upgradeNameLabel as Function;
        const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues) as keyof Upgrade;
        const upgradeIncrease = upgradeValues[upgradeRarity];
        const upgradeFunction = upgradeTypes[upgradeName].upgradeFunction as Function;
        const upgradeDescription = upgradeTypes[upgradeName].description as Function;
        const upgradeIcon = upgradeTypes[upgradeName].icon as string;

        return {
            upgradeName,
            upgradeNameLabel,
            upgradeRarity,
            upgradeIncrease,
            upgradeFunction,
            upgradeDescription,
            upgradeIcon,
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
