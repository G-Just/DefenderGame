import { enemyTypes, gameState, wall, pen, enemyList, CANVAS_WIDTH, CANVAS_HEIGHT } from "../Shared.js";
import { getRandomInt } from "../Helpers.js";

import type { EnemyType } from "../Shared.js";

export class Enemy {
    private y: number;
    private x: number;
    private height: number;
    private width: number;
    private enemyType: EnemyType;
    private currentHealth: number;
    private maxHealth: number;
    private name: string;
    private damage: number;
    private attackSpeed: number;
    private color: string;
    private movementSpeed: number;
    private xpDrop: number;
    private pointsDrop: number;
    private damageTimeout: number | null = null;
    private isFlashing: boolean = false;
    private isAttacking: boolean = false;

    constructor(enemyType = "normal") {
        this.enemyType = enemyTypes[enemyType];
        this.name = enemyType;
        this.y = getRandomInt(this.enemyType.height + 15, CANVAS_HEIGHT - this.enemyType.height - 15);
        this.movementSpeed = this.enemyType.speed;
        this.x = CANVAS_WIDTH;
        this.height = this.enemyType.height;
        this.width = this.enemyType.width;
        this.damage = this.enemyType.damage;
        this.attackSpeed = this.enemyType.attackSpeed;
        this.currentHealth = this.enemyType.health;
        this.maxHealth = this.enemyType.health;
        this.color = this.enemyType.color;
        this.xpDrop = this.enemyType.xpDrop;
        this.pointsDrop = this.enemyType.points;
    }

    // ============= Getters =============
    getHealth(): number {
        return this.currentHealth;
    }

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    getSize(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    getMovementSpeed(): number {
        return this.movementSpeed;
    }

    getAttackSpeed(): number {
        return this.attackSpeed;
    }

    getName(): string {
        return this.name;
    }

    getDamage(): number {
        return this.damage;
    }

    getXpDrop(): number {
        return this.xpDrop;
    }

    getIsAttacking(): boolean {
        return this.isAttacking;
    }

    // ============= Setters =============
    setMovementSpeed(movementSpeed: number): void {
        this.movementSpeed = movementSpeed;
    }

    setXpDrop(xpDrop: number): void {
        this.xpDrop = xpDrop;
    }

    // ============= Other Methods =============
    draw(): void {
        pen.fillStyle = this.color;
        pen.fillRect(this.x, this.y, this.width, this.height);

        // Drawing a health bar above the enemy
        pen.fillStyle = "black";
        pen.fillRect(this.x - 1, this.y - 16, this.width + 2, 7);
        pen.fillStyle = "red";
        const percentageHealth = (this.width * this.currentHealth) / this.maxHealth;
        pen.fillRect(this.x, this.y - 15, percentageHealth >= 0 ? percentageHealth : 0, 5);
    }

    move(): void {
        if (this.x > 235) {
            this.x -= this.movementSpeed;
        } else {
            this.isAttacking = true;
        }
    }

    doDamage(): void {
        // console.log(`Enemy ${this.name} is attacking the wall for ${this.enemyType.damage} damage`);
        wall.takeDamage(this.damage);

        // Animation for the enemy attacking
        const originalX = this.x;
        this.x -= 3;
        setTimeout(() => {
            this.x = originalX;
        }, 50);
    }

    takeDamage(damage: number): void {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            gameState.score += Math.round(this.pointsDrop);
            gameState.currentXp += Math.round(this.xpDrop);
            gameState.enemiesKilled++;
            enemyList.splice(enemyList.indexOf(this), 1);
        } else {
            // Flash white when taking damage
            this.color = "white";

            setTimeout(() => {
                this.color = this.enemyType.color; // This has to be enemyTypeColor to avoid "white bug"
            }, 75);
        }
    }
}
