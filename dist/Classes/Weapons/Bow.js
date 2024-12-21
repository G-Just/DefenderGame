import { Weapon } from "../Weapon.js";
import { Projectile } from "../Projectile.js";
import { enemyList, player } from "../../Shared.js";
export class Bow extends Weapon {
    constructor() {
        super("bow");
        this.projectileSpeed = 10;
    }
    shoot() {
        // get the closest enemy
        const closestEnemy = enemyList.reduce((closest, enemy) => {
            const distance = Math.hypot(enemy.getPosition().x - player.getPosition().x, enemy.getPosition().y - player.getPosition().y);
            const closestDistance = Math.hypot(closest.getPosition().x - player.getPosition().x, closest.getPosition().y - player.getPosition().y);
            return distance < closestDistance ? enemy : closest;
        }, enemyList[0]);
        // if the closest enemy is range, return a projectile
        if (closestEnemy) {
            const distance = Math.hypot(closestEnemy.getPosition().x - player.getPosition().x);
            if (distance <= this.range) {
                return new Projectile(player.getPosition().x, player.getPosition().y, this.weaponType.damage, this.projectileSpeed, this.getSprite(), Math.atan2(closestEnemy.getPosition().y +
                    closestEnemy.getSize().height / 2 -
                    player.getPosition().y, closestEnemy.getPosition().x +
                    closestEnemy.getSize().width / 2 -
                    player.getPosition().x));
            }
        }
        return null;
    }
}
