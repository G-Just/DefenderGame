import { Enemy } from "./Classes/Enemy.js";
import { Weapon } from "./Classes/Weapon.js";
import { resetGameLoop, run } from "./Engine.js";
import { enemyTypes } from "./Shared/Enemies.js";
import { enemyList, gameState, projectileList, weaponList } from "./Shared/States.js";
import { weaponTypes } from "./Shared/Weapons.js";

const debugMenu = document.getElementById("debug-menu");

const debugButton = document.getElementById("debug");
const levelButton = document.getElementById("debug-level");
const spawnEnemyButton = document.getElementById("spawn-enemy-button");
const getWeaponButton = document.getElementById("get-weapon-button");
const pauseButton = document.getElementById("debug-pause-game");
const logStatesButton = document.getElementById("debug-log-states");
const closeDebugButton = document.getElementById("close-debug-button");

const selectedEnemy = document.getElementById("enemy-select") as HTMLSelectElement;
const selectedWeapon = document.getElementById("weapon-select") as HTMLSelectElement;

debugButton?.addEventListener("click", () => {
    if (debugMenu) {
        debugMenu.style.display = debugMenu.style.display === "block" ? "none" : "block";
    }
});

closeDebugButton?.addEventListener("click", () => {
    if (debugMenu) {
        debugMenu.style.display = "none";
    }
});

logStatesButton?.addEventListener("click", () => {
    console.log("Game State : ", gameState);
    console.log("Weapon List: ", weaponList);
    console.log("Enemy List : ", enemyList);
    console.log("Projectile List : ", projectileList);
    pauseButton?.click();
});

levelButton?.addEventListener("click", () => {
    gameState.currentXp = gameState.xpToLevel;
    if (debugMenu) {
        debugMenu.style.display = "none";
    }
});

pauseButton?.addEventListener("click", () => {
    if (pauseButton.innerText === "Pause Game") {
        gameState.gamePaused = true;
        pauseButton.innerText = "Resume Game";
    } else {
        gameState.gamePaused = false;
        pauseButton.innerText = "Pause Game";
        resetGameLoop();
        run();
    }
});

getWeaponButton?.addEventListener("click", () => {
    getWeapon(selectedWeapon.value);
    populateDropdown("weapon-select", availableWeapons());
});

spawnEnemyButton?.addEventListener("click", () => {
    spawnEnemy(selectedEnemy.value);
    populateDropdown("enemy-select", availableEnemies());
});

function populateDropdown(selectElementId: string, options: string[]) {
    const selectElement = document.getElementById(selectElementId);
    selectElement ? (selectElement.innerHTML = "") : null;
    options.forEach((option, idx) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (idx === 0) {
            opt.selected = true;
        }
        selectElement?.appendChild(opt);
    });
}

const availableWeapons = () => {
    const usedWeapons: string[] = weaponList.map((weapon) => weapon.getName());
    const availableWeapons: string[] = Object.keys(weaponTypes).filter(
        (weaponName: string) => !usedWeapons.includes(weaponName)
    );

    if (availableWeapons.length === 0) {
        return ["No more available weapons"];
    }

    return availableWeapons;
};

const availableEnemies = () => {
    return Object.keys(enemyTypes);
};

function getWeapon(weaponName: string): void {
    weaponList.push(new Weapon(weaponName));
}

function spawnEnemy(enemyType: string): void {
    enemyList.push(new Enemy(enemyType));
}

populateDropdown("weapon-select", availableWeapons());
populateDropdown("enemy-select", availableEnemies());
