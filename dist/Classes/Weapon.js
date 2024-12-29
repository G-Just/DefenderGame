import { enemyList, player } from "../Shared/States.js";
import { weaponTypes } from "../Shared/Weapons.js";
import { Projectile } from "./Projectile.js";
export class Weapon {
    constructor(weaponType) {
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
    getProjectileSpeed() {
        return this.projectileSpeed;
    }
    getLevel() {
        return this.level;
    }
    getProjectileCount() {
        return this.projectileCount;
    }
    getWeaponRange() {
        return this.range;
    }
    getDescription() {
        return this.description;
    }
    // ============= Setters =============
    setDamage(damage) {
        this.damage = Math.round(damage);
    }
    setAttackSpeed(attackSpeed) {
        this.attackSpeed = attackSpeed;
    }
    setProjectileSpeed(projectileSpeed) {
        this.projectileSpeed = projectileSpeed;
    }
    setLevel(newLevel) {
        this.level = newLevel;
    }
    setProjectileCount(newProjectileCount) {
        this.projectileCount = newProjectileCount;
    }
    setWeaponRange(newRange) {
        this.range = newRange;
    }
    // ============= Other Methods =============
    shoot() {
        //TODO: add another targeting method like -> highest HP, fastest, slowest, lowest HP
        const closestEnemy = this.getClosestEnemy();
        if (closestEnemy) {
            const distance = Math.hypot(closestEnemy.getPosition().x - player.getPosition().x);
            if (distance <= this.range) {
                this.shootSound.play();
                return new Projectile(player.getPosition().x, player.getPosition().y, this.damage, this.projectileSpeed, this.getSprite(), Math.atan2(closestEnemy.getPosition().y +
                    closestEnemy.getSize().height / 2 -
                    player.getPosition().y, closestEnemy.getPosition().x +
                    closestEnemy.getSize().width / 2 -
                    player.getPosition().x));
            }
        }
        return null;
    }
    getClosestEnemy() {
        const closestEnemy = enemyList.reduce((closest, enemy) => {
            const distance = Math.hypot(enemy.getPosition().x - player.getPosition().x, enemy.getPosition().y - player.getPosition().y);
            const closestDistance = Math.hypot(closest.getPosition().x - player.getPosition().x, closest.getPosition().y - player.getPosition().y);
            return distance < closestDistance ? enemy : closest;
        }, enemyList[0]);
        return closestEnemy !== null && closestEnemy !== void 0 ? closestEnemy : null;
    }
}
