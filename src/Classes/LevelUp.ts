import { getThreeRandomUpgrades } from "../Helpers.js";
import { enemyList, weaponList, WeaponType } from "../Shared.js";
import { Weapon } from "./Weapon.js";

export class LevelUp {
    static displayUpgrades() {
        const upgradeScreen = document.getElementById("upgrade-wrapper");

        if (upgradeScreen) {
            upgradeScreen.style.display = "flex";
        }

        const upgrades = getThreeRandomUpgrades();

        const upgradeCard1 = document.querySelector(".upgrade-1");
        const upgradeCard2 = document.querySelector(".upgrade-2");
        const upgradeCard3 = document.querySelector(".upgrade-3");

        const upgradeCardName1 = document.querySelector(".upgrade-1 > .upgrade-card-name");
        const upgradeCardName2 = document.querySelector(".upgrade-2 > .upgrade-card-name");
        const upgradeCardName3 = document.querySelector(".upgrade-3 > .upgrade-card-name");

        const upgradeCardIcon1 = document.querySelector(".upgrade-1 > .upgrade-card-icon");
        const upgradeCardIcon2 = document.querySelector(".upgrade-2 > .upgrade-card-icon");
        const upgradeCardIcon3 = document.querySelector(".upgrade-3 > .upgrade-card-icon");

        const upgradeCardInfo1 = document.querySelector(".upgrade-1 > .upgrade-card-info");
        const upgradeCardInfo2 = document.querySelector(".upgrade-2 > .upgrade-card-info");
        const upgradeCardInfo3 = document.querySelector(".upgrade-3 > .upgrade-card-info");

        if (upgradeCardName1) {
            upgradeCardName1.innerHTML = upgrades[0].upgradeName;
        }
        if (upgradeCardName2) {
            upgradeCardName2.innerHTML = upgrades[1].upgradeName;
        }
        if (upgradeCardName3) {
            upgradeCardName3.innerHTML = upgrades[2].upgradeName;
        }

        if (upgradeCardIcon1) {
            upgradeCardIcon1.innerHTML = upgrades[0].upgradeIcon;
        }
        if (upgradeCardIcon2) {
            upgradeCardIcon2.innerHTML = upgrades[1].upgradeIcon;
        }
        if (upgradeCardIcon3) {
            upgradeCardIcon3.innerHTML = upgrades[2].upgradeIcon;
        }

        if (upgradeCardInfo1) {
            upgradeCardInfo1.innerHTML = upgrades[0].upgradeDescription;
        }
        if (upgradeCardInfo2) {
            upgradeCardInfo2.innerHTML = upgrades[1].upgradeDescription;
        }
        if (upgradeCardInfo3) {
            upgradeCardInfo3.innerHTML = upgrades[2].upgradeDescription;
        }
    }

    static increaseDamage(weapon: WeaponType, amountPercentage: number) {
        weapon.damage *= amountPercentage;
        weapon.level++;
    }

    static increaseAttackSpeed(weapon: WeaponType, amountPercentage: number) {
        weapon.attackSpeed *= amountPercentage;
        weapon.level++;
    }

    static decreaseMonsterMovementSpeed(amountPercentage: number) {
        enemyList.map((enemy) => enemy.setMovementSpeed(enemy.getMovementSpeed() * amountPercentage));
    }

    static increaseXpDrops(amountPercentage: number) {
        enemyList.map((enemy) => enemy.setMovementSpeed(enemy.getMovementSpeed() * amountPercentage));
    }

    static getNewWeapon(weaponName: string) {
        weaponList.push(new Weapon(weaponName));
    }
}
