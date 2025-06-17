import { Game } from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const game = new Game(canvas);
    game.start();
});
