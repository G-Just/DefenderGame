import { pen } from "../Shared.js";
export class FloatingDamageNumber {
    constructor(x, y, damage) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.opacity = 1;
        this.lifespan = 60; // lifespan in frames
    }
    update() {
        this.y -= 1;
        this.opacity -= 1 / this.lifespan;
        this.lifespan -= 1;
    }
    draw() {
        pen.save();
        pen.globalAlpha = this.opacity;
        pen.fillStyle = "red";
        pen.font = "20px Arial";
        pen.fillText(this.damage.toString(), this.x, this.y);
        pen.restore();
    }
    isAlive() {
        return this.lifespan > 0;
    }
}
