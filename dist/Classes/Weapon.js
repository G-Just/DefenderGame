import { weaponTypes } from "../Shared.js";
import { enemyList } from "../Engine.js";
export class Weapon {
    constructor(weaponType = "bow") {
        this.weaponType = weaponTypes[weaponType];
        this.name = weaponType;
        this.attackSpeed = this.weaponType.attackSpeed;
        this.damage = this.weaponType.damage;
        this.y = window.innerHeight / 2;
        this.x = 90;
    }
    shoot(pen) {
        var _a;
        const closestEnemy = (_a = enemyList.reduce((closest, enemy) => {
            const distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (!closest || distance < closest.distance) {
                return { enemy, distance };
            }
            return closest;
        }, null)) === null || _a === void 0 ? void 0 : _a.enemy;
        this.doDamage(closestEnemy);
    }
    doDamage(closestEnemy) {
        if (closestEnemy) {
            closestEnemy.takeDamage(this.damage);
            if (closestEnemy.currentHealth <= 0) {
                enemyList.splice(enemyList.indexOf(closestEnemy), 1);
            }
        }
    }
}
