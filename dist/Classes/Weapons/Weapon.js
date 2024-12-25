import { weaponTypes, enemyList, player } from "../../Shared.js";
export class Weapon {
    constructor(weaponType = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.projectileSprite = new Image();
        this.projectileSprite.src = this.weaponType.projectileSprite;
        this.range = this.weaponType.range;
        this.projectileSpeed = this.weaponType.projectileSpeed;
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
    getProjectileSpeed() {
        return this.projectileSpeed;
    }
    setDamage(damage) {
        this.damage = damage;
    }
    setAttackSpeed(attackSpeed) {
        this.attackSpeed = attackSpeed;
    }
    setProjectileSpeed(projectileSpeed) {
        this.projectileSpeed = projectileSpeed;
    }
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
