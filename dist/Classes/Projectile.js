import { pen } from "../Shared.js";
export class Projectile {
    constructor(x, y, damage, speed, sprite, direction) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.speed = speed;
        this.sprite = sprite;
        this.direction = direction;
    }
    getDamage() {
        return this.damage;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    getSize() {
        return { width: this.sprite.width, height: this.sprite.height };
    }
    draw() {
        pen.save();
        pen.translate(this.x + this.sprite.width / 2, this.y + this.sprite.height / 2);
        pen.rotate(this.direction);
        pen.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2, this.sprite.width, this.sprite.height);
        pen.restore();
    }
    move() {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
    }
}
