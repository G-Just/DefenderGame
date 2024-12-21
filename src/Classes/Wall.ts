import { pen } from "../Shared.js";

export class Wall {
    private y: number;
    private x: number;
    private height: number;
    private width: number;
    private currentWallHealth: number;
    private maxWallHealth: number;

    constructor() {
        this.x = 200;
        this.y = 0;
        this.width = 20;
        this.height = window.innerHeight;
        this.currentWallHealth = 1000;
        this.maxWallHealth = 1000;
    }

    // TODO: Implement health bar smoothing
    // healthBarSmoothing(targetHealth: number): void {
    //     const percentageHealth = (590 * this.currentWallHealth) / this.maxWallHealth;
    //     const change = this.currentWallHealth - targetHealth;
    //     this.currentWallHealth = targetHealth;

    //     // const interval = setInterval(() => {
    //     //     if (this.currentWallHealth > targetHealth) {
    //     //         this.currentWallHealth -= 1;
    //     //         if (this.currentWallHealth <= targetHealth) {
    //     //             this.currentWallHealth = targetHealth;
    //     //             clearInterval(interval);
    //     //         }
    //     //     } else {
    //     //         clearInterval(interval);
    //     //     }
    //     // }, 50);

    //     pen.fillStyle = "white";
    //     pen.fillRect(window.innerWidth / 2 - 295 + percentageHealth, 14, change, 17);
    // }

    takeDamage(damage: number): void {
        // this.healthBarSmoothing(this.currentWallHealth - damage);
        this.currentWallHealth -= damage;
    }

    draw(): void {
        pen.fillStyle = "gray";
        pen.fillRect(this.x, this.y, this.width, this.height);

        // Drawing a health bar
        pen.fillStyle = "black";
        pen.fillRect(window.innerWidth / 2 - 300, 10, 600, 25);
        pen.fillStyle = "red";
        const percentageHealth = (590 * this.currentWallHealth) / this.maxWallHealth;

        pen.fillRect(window.innerWidth / 2 - 295, 14, percentageHealth <= 0 ? 0 : percentageHealth, 17);
    }
}
