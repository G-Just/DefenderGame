import {
    pickRandomWeapon,
    getThreeRandomUpgrades,
    generateRandomWeapon,
    getRandomUpgrade,
} from "../Shared/Helpers.js";
import { run } from "../Engine.js";
import { gameState, wall } from "../Shared/States.js";

export class LevelUp {
    static displayUpgrades() {
        const upgradeScreen = document.getElementById("upgrade-wrapper");
        if (upgradeScreen) upgradeScreen.style.display = "flex";

        const weapons = [pickRandomWeapon(), pickRandomWeapon(), pickRandomWeapon()];

        const handleGetNewWeapon = (index: number) => {
            const newWeapon = generateRandomWeapon();
            if (newWeapon) {
                weapons[index] = newWeapon;
                return null; // No need to replace the upgrade
            }
            return getRandomUpgrade(false); // Fallback if no available weapon
        };

        const handleRepairWall = (index: number) => {
            const result = wall.getCurrentHealth() >= wall.getMaxHealth() ? getRandomUpgrade() : null; // No change needed if wall can be repaired
            if (result && result.upgradeName === "getNewWeapon") {
                return handleGetNewWeapon(index);
            }
            return result;
        };

        const upgrades = getThreeRandomUpgrades().map((upgrade, index) => {
            switch (upgrade.upgradeName) {
                case "getNewWeapon":
                    return handleGetNewWeapon(index) || upgrade;

                case "repairWall":
                    return handleRepairWall(index) || upgrade;

                default:
                    return upgrade;
            }
        });

        const upgradeCards: (HTMLElement | null)[] = [
            document.querySelector(".upgrade-1"),
            document.querySelector(".upgrade-2"),
            document.querySelector(".upgrade-3"),
        ];

        upgradeCards.forEach((card, index) => {
            if (!card) return;
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
            const iconElement: HTMLImageElement | null = card.querySelector(".upgrade-card-icon > img");
            const descriptionElement = card.querySelector(".upgrade-card-description > p");

            if (nameElement && typeof upgrade.upgradeNameLabel === "function") {
                nameElement.innerHTML = upgrade.upgradeNameLabel(weapons[index].getName());
            }
            if (iconElement && typeof upgrade.upgradeIcon === "string")
                iconElement.src = upgrade.upgradeIcon;
            if (descriptionElement) {
                if (typeof upgrade.upgradeDescription === "function") {
                    descriptionElement.innerHTML = upgrade.upgradeDescription(
                        weapons[index],
                        upgrade.upgradeIncrease
                    );
                }
            }

            const handleUpgradeClick = () => {
                if (typeof upgrade.upgradeFunction === "function") {
                    upgrade.upgradeFunction(weapons[index], upgrade.upgradeIncrease);
                }
                console.log(upgrade.upgradeName);
                resumeGame();
            };

            if ((card as any)._upgradeClickListener) {
                card.removeEventListener("click", (card as any)._upgradeClickListener);
            }

            (card as any)._upgradeClickListener = handleUpgradeClick;
            card.addEventListener("click", handleUpgradeClick);

            const resumeGame = () => {
                if (upgradeScreen) upgradeScreen.style.display = "none";
                gameState.gamePaused = false;
                run();
            };
        });
    }
}
