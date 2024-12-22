import { weaponList } from "../Shared.js";
import { Weapon } from "./Weapon.js";
export class LevelUp {
    static increaseDamage(weapon, amountPercentage) {
        weapon.damage *= amountPercentage;
        weapon.level++;
    }
    static increaseAttackSpeed(weapon, amountPercentage) {
        weapon.attackSpeed *= amountPercentage;
        weapon.level++;
    }
    static getNewWeapon(weaponName) {
        weaponList.push(new Weapon(weaponName));
    }
}
