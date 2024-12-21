import { weaponTypes, WeaponType } from "../Shared.js";
import { Enemy } from "./Enemy.js";
import { enemyList } from "../Engine.js";

export class Weapon {
    public weaponType: WeaponType;
    public name: string;
    public damage: number;
    public x: number;
    public y: number;
    public attackSpeed: number;

    constructor(weaponType = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.y = window.innerHeight / 2;
        this.x = 90;
    }

    shoot(pen: CanvasRenderingContext2D): void {
        const closestEnemy = enemyList.reduce<{ enemy: Enemy; distance: number } | null>(
            (closest, enemy) => {
                const distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                if (!closest || distance < closest.distance) {
                    return { enemy, distance };
                }
                return closest;
            },
            null
        )?.enemy;

        this.doDamage(closestEnemy);
    }

    doDamage(closestEnemy: Enemy | undefined): void {
        if (closestEnemy) {
            closestEnemy.takeDamage(this.damage);
            if (closestEnemy.currentHealth <= 0) {
                enemyList.splice(enemyList.indexOf(closestEnemy), 1);
            }
        }
    }
}
