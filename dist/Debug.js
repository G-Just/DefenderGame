import { gameState } from "./Shared/States.js";
const debugMenu = document.getElementById("debug-menu");
const debugButton = document.getElementById("debug");
const levelButton = document.getElementById("debug-level");
debugButton === null || debugButton === void 0 ? void 0 : debugButton.addEventListener("click", () => {
    if (debugMenu) {
        debugMenu.style.display = debugMenu.style.display === "block" ? "none" : "block";
    }
});
levelButton === null || levelButton === void 0 ? void 0 : levelButton.addEventListener("click", () => (gameState.currentXp = gameState.xpToLevel));
