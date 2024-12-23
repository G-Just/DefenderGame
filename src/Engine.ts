import { Enemy } from "./Classes/Enemy.js";
import { LevelUp } from "./Classes/LevelUp.js";
import { Bow } from "./Classes/Weapons/Bow.js";
import { FireWand } from "./Classes/Weapons/FireWand.js";
import {
    getRandomEnemyType,
    getRandomInt,
    getThreeRandomUpgrades,
    rollSelectedUpgradeRarity,
} from "./Helpers.js";
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
    upgradeTypes,
} from "./Shared.js";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const background = new Image();
background.src = "./dist/Art/Sprites/background.png";

setInterval(() => {
    enemyList.push(new Enemy(getRandomEnemyType()));
}, getRandomInt(500, 5000));

weaponList.push(new Bow(), new FireWand());

function drawLoop(): void {
    const interval = 1000 / FPS;
    let lastTime = 0;

    function drawLoop(currentTime: number) {
        if (gameState.gamePaused) {
            return;
        }
        const deltaTime = currentTime - lastTime;

        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);

            pen.clearRect(0, 0, canvas.width, canvas.height);
            pen.drawImage(background, 0, 0, canvas.width, canvas.height);

            pen.fillStyle = "black";
            pen.font = "20px Consolas";
            pen.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH - 200, 30);

            pen.fillStyle = "black";
            pen.fillRect(20, 10, 150, 25);
            pen.fillStyle = "orange";
            const percentageXp = (150 * gameState.currentXp) / gameState.xpToLevel;
            pen.fillRect(22, 12, percentageXp, 21);
            pen.font = "15px Consolas";
            pen.fillStyle = "white";
            pen.textAlign = "center";
            pen.fillText(`XP: ${gameState.currentXp} / ${gameState.xpToLevel}`, 91, 27);

            pen.fillStyle = "black";
            pen.textAlign = "center";
            pen.font = "20px Consolas";
            pen.fillText(`Your Level: ${gameState.level}`, 95, 55);

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
        requestAnimationFrame(drawLoop);
    }
    requestAnimationFrame(drawLoop);
}

function executeEnemyAttacking(): void {
    const lastAttackTimes = new Map<Enemy, number>();

    function enemyAttackLoop(currentTime: number) {
        if (gameState.gamePaused) {
            return;
        }
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
        if (gameState.gamePaused) {
            return;
        }
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
    if (gameState.gamePaused) {
        return;
    }
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

function stateLogicChecks() {
    if (gameState.gamePaused) {
        return;
    }
    if (gameState.currentXp >= gameState.xpToLevel) {
        gameState.level++;
        gameState.currentXp = 0;
        gameState.xpToLevel = Math.round(gameState.xpToLevel * 1.2);

        // trigger a levelup event where player picks weapons / upgrades
        levelup();
    }
    requestAnimationFrame(stateLogicChecks);
}

function levelup() {
    gameState.gamePaused = true;

    LevelUp.displayUpgrades();

    setTimeout(() => {
        gameState.gamePaused = false;
        run();
    }, 2000);
}

function run() {
    drawLoop();
    executeEnemyAttacking();
    executeWeaponAttacking();
    projectileCollisionCheck();
    stateLogicChecks();
}

run();
