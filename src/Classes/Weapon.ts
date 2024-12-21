import { weaponTypes, WeaponType, enemyList, player } from "../Shared.js";
import { Enemy } from "./Enemy.js";

export class Weapon {
    protected weaponType: WeaponType;
    protected name: string;
    protected damage: number;
    protected attackSpeed: number;
    protected range: number;
    protected projectileSprite: HTMLImageElement;
    protected projectileSpeed: number;

    constructor(weaponType: string = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.projectileSprite = new Image();
        this.projectileSprite.src = this.weaponType.projectileSprite;
        this.range = this.weaponType.range;
        this.projectileSpeed = this.weaponType.projectileSpeed;
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

    getClosestEnemy(): Enemy | null {
        const closestEnemy = enemyList.reduce((closest, enemy) => {
            const distance = Math.hypot(
                enemy.getPosition().x - player.getPosition().x,
                enemy.getPosition().y - player.getPosition().y
            );
            const closestDistance = Math.hypot(
                closest.getPosition().x - player.getPosition().x,
                closest.getPosition().y - player.getPosition().y
            );
            return distance < closestDistance ? enemy : closest;
        }, enemyList[0]);

        return closestEnemy ?? null;
    }
}
