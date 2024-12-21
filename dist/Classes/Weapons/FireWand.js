import { Weapon } from "../Weapon.js";
import { Projectile } from "../Projectile.js";
import { player } from "../../Shared.js";
const fireBallShootingSound = new Howl({
    src: ["../../dist/Art/Sound/fireBallSFX.mp3"],
    volume: 0.1,
});
export class FireWand extends Weapon {
    constructor() {
        super("fireWand");
    }
    shoot() {
        const closestEnemy = this.getClosestEnemy();
        if (closestEnemy) {
            const distance = Math.hypot(closestEnemy.getPosition().x - player.getPosition().x);
            if (distance <= this.range) {
                fireBallShootingSound.play();
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
