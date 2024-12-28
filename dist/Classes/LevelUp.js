import { pickRandomWeapon, getThreeRandomUpgrades, generateRandomWeapon, getRandomUpgrade, } from "../Shared/Helpers.js";
import { run } from "../Engine.js";
import { gameState } from "../Shared/States.js";
export class LevelUp {
    static displayUpgrades() {
        const upgradeScreen = document.getElementById("upgrade-wrapper");
        if (upgradeScreen)
            upgradeScreen.style.display = "flex";
        const weapons = [pickRandomWeapon(), pickRandomWeapon(), pickRandomWeapon()];
        const upgrades = getThreeRandomUpgrades().map((upgrade, index) => {
            if (upgrade.upgradeName === "getNewWeapon") {
                const newWeapon = generateRandomWeapon();
                if (newWeapon) {
                    weapons[index] = newWeapon;
                }
                else {
                    return getRandomUpgrade(false);
                }
            }
            return upgrade;
        });
        const upgradeCards = [
            document.querySelector(".upgrade-1"),
            document.querySelector(".upgrade-2"),
            document.querySelector(".upgrade-3"),
        ];
        upgradeCards.forEach((card, index) => {
            if (!card)
                return;
            const upgrade = upgrades[index];
            switch (upgrade.upgradeRarity) {
                case "normal":
                    card.style.color = "black";
                    card.style.borderColor = "black";
                    card.style.backgroundColor = "darkgray";
                    card.setAttribute("data-before", "Normal");
                    break;
                case "rare":
                    card.style.color = "white";
                    card.style.borderColor = "black";
                    card.style.backgroundColor = "#4682B4";
                    card.setAttribute("data-before", "Rare");
                    break;
                case "legendary":
                    card.style.color = "white";
                    card.style.borderColor = "black";
                    card.style.backgroundColor = "#B8860B";
                    card.setAttribute("data-before", "Legendary");
                    break;
                case "ancient":
                    card.style.color = "white";
                    card.style.borderColor = "black";
                    card.style.backgroundColor = "#800000";
                    card.setAttribute("data-before", "Ancient");
                    break;
                default:
                    break;
            }
            const nameElement = card.querySelector(".upgrade-card-name > p");
            const iconElement = card.querySelector(".upgrade-card-icon > img");
            const descriptionElement = card.querySelector(".upgrade-card-description > p");
            if (nameElement && typeof upgrade.upgradeNameLabel === "function") {
                nameElement.innerHTML = upgrade.upgradeNameLabel(weapons[index].getName());
            }
            if (iconElement && typeof upgrade.upgradeIcon === "string")
                iconElement.src = upgrade.upgradeIcon;
            if (descriptionElement) {
                if (typeof upgrade.upgradeDescription === "function") {
                    descriptionElement.innerHTML = upgrade.upgradeDescription(weapons[index], upgrade.upgradeIncrease);
                }
            }
            const handleUpgradeClick = () => {
                if (typeof upgrade.upgradeFunction === "function") {
                    upgrade.upgradeFunction(weapons[index], upgrade.upgradeIncrease);
                }
                removeEventListeners();
                resumeGame();
            };
            const removeEventListeners = () => {
                upgradeCards.forEach((card) => {
                    card === null || card === void 0 ? void 0 : card.removeEventListener("click", handleUpgradeClick);
                });
            };
            const resumeGame = () => {
                if (upgradeScreen)
                    upgradeScreen.style.display = "none";
                gameState.gamePaused = false;
                run();
            };
            // FIXME: this is not working, the event listener fires multiple times, logic for not running run() is defined within engine.ts
            removeEventListeners();
            card.addEventListener("click", handleUpgradeClick);
        });
    }
}
