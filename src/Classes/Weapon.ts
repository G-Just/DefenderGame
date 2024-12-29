import { enemyList, player } from "../Shared/States.js";
import { WeaponType } from "../Shared/Types.js";
import { weaponTypes } from "../Shared/Weapons.js";
import { Enemy } from "./Enemy.js";
import { Projectile } from "./Projectile.js";

export class Weapon {
    private weaponType: WeaponType;
    private name: string;
    private damage: number;
    private attackSpeed: number;
    private projectileCount: number;
    private range: number;
    private projectileSprite: HTMLImageElement;
    private projectileSpeed: number;
    private level: number;
    private description: string;
    private shootSound: Howl;

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
        this.shootSound = new Howl({
            src: [this.weaponType.shootSound],
            volume: 0.1,
        });
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

    shoot(): Projectile | null {
        //TODO: add another targeting method like -> highest HP, fastest, slowest, lowest HP

        const closestEnemy = this.getClosestEnemy();

        if (closestEnemy) {
            const distance = Math.hypot(closestEnemy.getPosition().x - player.getPosition().x);
            if (distance <= this.range) {
                this.shootSound.play();
                return new Projectile(
                    player.getPosition().x,
                    player.getPosition().y,
                    this.damage,
                    this.projectileSpeed,
                    this.getSprite(),
                    Math.atan2(
                        closestEnemy.getPosition().y +
                            closestEnemy.getSize().height / 2 -
                            player.getPosition().y,

                        closestEnemy.getPosition().x +
                            closestEnemy.getSize().width / 2 -
                            player.getPosition().x
                    )
                );
            }
        }
        return null;
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
