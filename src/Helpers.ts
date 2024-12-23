import { LevelUp } from "./Classes/LevelUp.js";
import { enemyTypes, Upgrade, upgradeTypes, upgradeWeights } from "./Shared.js";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEnemyType(): string {
    return Object.keys(enemyTypes)[Math.floor(Math.random() * Object.keys(enemyTypes).length)];
}

export function getThreeRandomUpgrades(): {
    upgradeName: string;
    upgradeRarity: string;
    upgradeIncrease: number;
    upgradeMethod: LevelUp;
    upgradeDescription: string;
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

        const upgradeRarity = rollSelectedUpgradeRarity(upgradeValues) as keyof Upgrade;
        const upgradeIncrease = upgradeValues[upgradeRarity];
        const upgradeMethod = upgradeTypes[upgradeName].method as LevelUp;
        const upgradeDescription = upgradeTypes[upgradeName].description as string;
        const upgradeIcon = upgradeTypes[upgradeName].icon as string;

        return {
            upgradeName,
            upgradeRarity,
            upgradeIncrease,
            upgradeMethod,
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
