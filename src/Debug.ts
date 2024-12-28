import { gameState } from "./Shared/States.js";

const debugMenu = document.getElementById("debug-menu");

const debugButton = document.getElementById("debug");
const levelButton = document.getElementById("debug-level");

debugButton?.addEventListener("click", () => {
    if (debugMenu) {
        debugMenu.style.display = debugMenu.style.display === "block" ? "none" : "block";
    }
});

levelButton?.addEventListener("click", () => (gameState.currentXp = gameState.xpToLevel));
