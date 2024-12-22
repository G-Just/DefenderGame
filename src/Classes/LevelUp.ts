import { weaponList, WeaponType } from "../Shared.js";
import { Weapon } from "./Weapon.js";

export class LevelUp {
    static increaseDamage(weapon: WeaponType, amountPercentage: number) {
        weapon.damage *= amountPercentage;
        weapon.level++;
    }

    static increaseAttackSpeed(weapon: WeaponType, amountPercentage: number) {
        weapon.attackSpeed *= amountPercentage;
        weapon.level++;
    }

    static getNewWeapon(weaponName: string) {
        weaponList.push(new Weapon(weaponName));
    }
}
