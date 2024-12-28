import { enemyList, player } from "../../Shared/States.js";
import { weaponTypes } from "../../Shared/Weapons.js";
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
        console.warn("Shoot method was called. This was called from the parent class.\n\nYou should override this method in the child class");
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
