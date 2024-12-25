import { getRandomWeapon, getThreeRandomUpgrades } from "../Helpers.js";
import { gameState, rarityColors, weaponList } from "../Shared.js";
import { run } from "../Engine.js";

export class LevelUp {
    static displayUpgrades() {
        const upgradeScreen = document.getElementById("upgrade-wrapper");
        if (upgradeScreen) upgradeScreen.style.display = "flex";

        const upgrades = getThreeRandomUpgrades();
        const weapons = [getRandomWeapon(), getRandomWeapon(), getRandomWeapon()];
        const upgradeCards: (HTMLElement | null)[] = [
            document.querySelector(".upgrade-1"),
            document.querySelector(".upgrade-2"),
            document.querySelector(".upgrade-3"),
        ];

        upgradeCards.forEach((card, index) => {
            if (!card) return;
            const upgrade = upgrades[index];
            card.style.backgroundColor = rarityColors[upgrade.upgradeRarity];
            if (["rare", "legendary", "ancient"].includes(upgrade.upgradeRarity)) {
                card.style.color = "white";
            } else {
                card.style.color = "black";
            }

            const nameElement = card.querySelector(".upgrade-card-name > p");
            const iconElement: HTMLImageElement | null = card.querySelector(".upgrade-card-icon > img");
            const descriptionElement = card.querySelector(".upgrade-card-description > p");

            if (nameElement) nameElement.innerHTML = upgrade.upgradeNameLabel(weapons[index].getName());
            if (iconElement) iconElement.src = upgrade.upgradeIcon;
            if (descriptionElement) {
                descriptionElement.innerHTML = upgrade.upgradeDescription(
                    weapons[index].getName(),
                    upgrade.upgradeIncrease
                );
            }

            const handleUpgradeClick = () => {
                upgrade.upgradeFunction(weapons[index], upgrade.upgradeIncrease);
                removeEventListeners();
                resumeGame();
            };

            const removeEventListeners = () => {
                upgradeCards.forEach((card) => {
                    card?.removeEventListener("click", handleUpgradeClick);
                });
            };

            const resumeGame = () => {
                if (upgradeScreen) upgradeScreen.style.display = "none";
                gameState.gamePaused = false;
                console.log(weaponList);
                run();
            };

            removeEventListeners();
            card.removeEventListener("click", handleUpgradeClick);
            card.addEventListener("click", handleUpgradeClick);
        });
    }
}
