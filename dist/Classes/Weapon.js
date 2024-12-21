import { weaponTypes } from "../Shared.js";
export class Weapon {
    constructor(weaponType = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.projectileSprite = new Image();
        this.projectileSprite.src = this.weaponType.projectileSprite;
        this.range = this.weaponType.range;
    }
    getAttackSpeed() {
        return this.attackSpeed;
    }
    getDamage() {
        return this.damage;
    }
    getName() {
        return this.name;
    }
    getSprite() {
        return this.projectileSprite;
    }
    shoot() {
        console.warn("Shoot method was called. This was called from the parent class.\n\nYou should override this method in the child class");
    }
}
