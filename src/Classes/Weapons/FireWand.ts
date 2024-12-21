import { Weapon } from "../Weapon.js";
import { Projectile } from "../Projectile.js";
import { enemyList, player } from "../../Shared.js";

export class FireWand extends Weapon {
    constructor() {
        super("fireWand");
    }

    shoot(): Projectile | null {
        const closestEnemy = this.getClosestEnemy();

        if (closestEnemy) {
            const distance = Math.hypot(closestEnemy.getPosition().x - player.getPosition().x);
            if (distance <= this.range) {
                return new Projectile(
                    player.getPosition().x,
                    player.getPosition().y,
                    this.weaponType.damage,
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
}
