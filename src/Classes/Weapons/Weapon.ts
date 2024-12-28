import { enemyList, player } from "../../Shared/States.js";
import { WeaponType } from "../../Shared/Types.js";
import { weaponTypes } from "../../Shared/Weapons.js";
import { Enemy } from "../Enemy.js";

export class Weapon {
    protected weaponType: WeaponType;
    protected name: string;
    protected damage: number;
    protected attackSpeed: number;
    protected projectileCount: number;
    protected range: number;
    protected projectileSprite: HTMLImageElement;
    protected projectileSpeed: number;
    protected level: number;
    protected description: string;

    constructor(weaponType: string) {
        this.weaponType = weaponTypes[weaponType];
        this.name = this.weaponType.name;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.projectileSprite = new Image();
        this.projectileSprite.src = this.weaponType.projectileSprite;
        this.range = this.weaponType.range;
        this.projectileSpeed = this.weaponType.projectileSpeed;
        this.level = 1;
        this.projectileCount = this.weaponType.projectileCount;
        this.description = this.weaponType.weaponDescription;
    }

    // ============= Getters =============
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

    getProjectileSpeed(): number {
        return this.projectileSpeed;
    }

    getLevel(): number {
        return this.level;
    }

    getProjectileCount(): number {
        return this.projectileCount;
    }

    getWeaponRange(): number {
        return this.range;
    }

    getDescription(): string {
        return this.description;
    }

    // ============= Setters =============
    setDamage(damage: number): void {
        this.damage = Math.round(damage);
    }

    setAttackSpeed(attackSpeed: number): void {
        this.attackSpeed = attackSpeed;
    }

    setProjectileSpeed(projectileSpeed: number): void {
        this.projectileSpeed = projectileSpeed;
    }

    setLevel(newLevel: number): void {
        this.level = newLevel;
    }

    setProjectileCount(newProjectileCount: number): void {
        this.projectileCount = newProjectileCount;
    }

    setWeaponRange(newRange: number): void {
        this.range = newRange;
    }

    // ============= Other Methods =============
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
