import { Enemy } from "./Classes/Enemy.js";
import { Bow } from "./Classes/Weapons/Bow.js";
import { FireWand } from "./Classes/Weapons/FireWand.js";
import { getRandomEnemyType, getRandomInt } from "./Helpers.js";
import {
    enemyList,
    weaponList,
    player,
    wall,
    projectileList,
    FPS,
    canvas,
    pen,
    gameState,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
} from "./Shared.js";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const background = new Image();
background.src = "./dist/Art/Sprites/background.png";

setInterval(() => {
    enemyList.push(new Enemy(getRandomEnemyType()));
}, getRandomInt(1000, 10000));

weaponList.push(new Bow(), new FireWand());

function gameLoop(): void {
    const interval = 1000 / FPS;
    let lastTime = 0;

    function gameLoop(currentTime: number) {
        const deltaTime = currentTime - lastTime;

        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);

            pen.clearRect(0, 0, canvas.width, canvas.height);
            pen.drawImage(background, 0, 0, canvas.width, canvas.height);

            pen.fillStyle = "black";
            pen.font = "20px Consolas";
            pen.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH - 200, 30);

            player.draw();
            wall.draw();

            enemyList.forEach((enemy) => {
                enemy.move();
                enemy.draw();
            });

            projectileList.forEach((projectile) => {
                projectile.move();
                projectile.draw();
            });
        }
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}

function executeEnemyAttacking(): void {
    const lastAttackTimes = new Map<Enemy, number>();

    function enemyAttackLoop(currentTime: number) {
        enemyList.forEach((enemy) => {
            const attackSpeed = enemy.getAttackSpeed();
            const interval = 1000 / attackSpeed;

            const lastTime = lastAttackTimes.get(enemy) || 0;

            if (enemy.isAttacking && currentTime - lastTime >= interval) {
                enemy.doDamage();
                lastAttackTimes.set(enemy, currentTime);
            }
        });
        requestAnimationFrame(enemyAttackLoop);
    }
    requestAnimationFrame(enemyAttackLoop);
}

function executeWeaponAttacking(): void {
    const lastAttackTimes = new Map<Object, number>();

    function weaponAttackLoop(currentTime: number) {
        weaponList.forEach((weapon) => {
            const attackSpeed = weapon.getAttackSpeed();
            const interval = 1000 / attackSpeed;

            const lastTime = lastAttackTimes.get(weapon) || 0;

            if (currentTime - lastTime >= interval) {
                const projectile = weapon.shoot();
                if (projectile) {
                    projectileList.push(projectile);
                }
                lastAttackTimes.set(weapon, currentTime);
            }
        });
        requestAnimationFrame(weaponAttackLoop); // Continue the loop.
    }
    requestAnimationFrame(weaponAttackLoop); // Start the loop.
}

function projectileCollisionCheck(): void {
    projectileList.forEach((projectile) => {
        // out of bounds check
        if (projectile.getPosition().x > CANVAS_WIDTH || projectile.getPosition().x < 0) {
            projectileList.splice(projectileList.indexOf(projectile), 1);
        }
        if (projectile.getPosition().y > CANVAS_HEIGHT || projectile.getPosition().y < 0) {
            projectileList.splice(projectileList.indexOf(projectile), 1);
        }
    });

    // enemy collision check
    for (let i = 0; i < enemyList.length; i++) {
        for (let j = 0; j < projectileList.length; j++) {
            const enemy = enemyList[i];
            const projectile = projectileList[j];
            const enemyPosition = enemy.getPosition();
            const projectilePosition = projectile.getPosition();

            const enemySize = enemy.getSize();
            const projectileSize = projectile.getSize();

            if (
                projectilePosition.x < enemyPosition.x + enemySize.width &&
                projectilePosition.x + projectileSize.width > enemyPosition.x &&
                projectilePosition.y < enemyPosition.y + enemySize.height &&
                projectilePosition.y + projectileSize.height > enemyPosition.y
            ) {
                // TODO: make floating damage numbers
                enemy.takeDamage(projectile.getDamage());
                projectileList.splice(j, 1);
            }
        }
    }
    requestAnimationFrame(projectileCollisionCheck);
}

gameLoop();
executeEnemyAttacking();
executeWeaponAttacking();
projectileCollisionCheck();
