import { weaponTypes, WeaponType } from "../Shared.js";

export class Weapon {
    protected weaponType: WeaponType;
    protected name: string;
    protected damage: number;
    protected attackSpeed: number;
    protected range: number;
    protected projectileSprite: HTMLImageElement;

    constructor(weaponType: string = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.projectileSprite = new Image();
        this.projectileSprite.src = this.weaponType.projectileSprite;
        this.range = this.weaponType.range;
    }

    getAttackSpeed(): number {
        return this.attackSpeed;
    }

    getDamage(): number {
        return this.damage;
    }

    getName(): string {
        return this.name;
    }

    getSprite(): HTMLImageElement {
        return this.projectileSprite;
    }

    shoot(): any {
        console.warn(
            "Shoot method was called. This was called from the parent class.\n\nYou should override this method in the child class"
        );
    }
}
