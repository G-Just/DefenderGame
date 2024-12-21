import { pen } from "../Shared.js";

export class Projectile {
    private x: number;
    private y: number;
    private speed: number;
    private damage: number;
    private sprite: HTMLImageElement;
    private direction: number;

    constructor(
        x: number,
        y: number,
        damage: number,
        speed: number,
        sprite: HTMLImageElement,
        direction: number
    ) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.speed = speed;
        this.sprite = sprite;
        this.direction = direction;
    }

    getDamage(): number {
        return this.damage;
    }

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    getSize(): { width: number; height: number } {
        return { width: this.sprite.width, height: this.sprite.height };
    }

    draw(): void {
        pen.save();
        pen.translate(this.x + this.sprite.width / 2, this.y + this.sprite.height / 2);
        pen.rotate(this.direction);
        pen.drawImage(
            this.sprite,
            -this.sprite.width / 2,
            -this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        pen.restore();
    }

    move(): void {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
    }
}
