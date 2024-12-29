import { CANVAS_HEIGHT, CANVAS_WIDTH, pen } from "../Shared/General.js";

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
        this.height = CANVAS_HEIGHT;
        this.currentWallHealth = 1000;
        this.maxWallHealth = 1000;
    }

    // ============= Getters =============

    getCurrentHealth(): number {
        return this.currentWallHealth;
    }

    getMaxHealth(): number {
        return this.maxWallHealth;
    }

    // ============= Setters =============

    setCurrentHealth(newHealth: number): void {
        if (newHealth >= this.maxWallHealth) {
            this.currentWallHealth = this.maxWallHealth;
        } else {
            this.currentWallHealth = Math.round(newHealth);
        }
    }

    setMaxHealth(newHealth: number): void {
        this.maxWallHealth = newHealth;
    }

    // ============= Other Methods =============

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
    //     pen.fillRect(CANVAS_WIDTH / 2 - 295 + percentageHealth, 14, change, 17);
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
        pen.fillRect(CANVAS_WIDTH / 2 - 300, 10, 600, 25);
        pen.fillStyle = "red";
        const percentageHealth = (590 * this.currentWallHealth) / this.maxWallHealth;

        pen.fillRect(CANVAS_WIDTH / 2 - 295, 14, percentageHealth <= 0 ? 0 : percentageHealth, 17);

        pen.font = "16px Consolas";
        pen.fillStyle = "white";
        pen.textAlign = "center";
        pen.fillText(`HP: ${this.currentWallHealth} / ${this.maxWallHealth}`, CANVAS_WIDTH / 2, 27);
    }
}
