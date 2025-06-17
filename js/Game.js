import { Snake } from "./Snake.js";
import { Food } from "./Food.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.snake = new Snake();
        this.food = new Food();
        
        this.speed = 100;
        this.intervalId = null;

        this.score = 0;
        this.highScore = Number(localStorage.getItem("highScore")) || 0;

        this.updateHUD();

        document.addEventListener("keydown", this.handleKey.bind(this));
    }

    start() {
        this.intervalId = setInterval(() => this.loop(), this.speed);
    }

    loop() {
        this.snake.move();

        // Colisión con comida
        if (this.snake.collidesWith(this.food)) {
            this.snake.grow();
            this.food.reposition();
            this.increaseScore();
        }

        // Colisión con pared o cuerpo
        if (this.snake.hitWall(this.canvas.width, this.canvas.height) || this.snake.hitSelf()) {
            this.gameOver();
            return;
        }

        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }

    handleKey(event) {
        const { key } = event;
        if (key === "ArrowUp") this.snake.setDirection(0, -1);
        if (key === "ArrowDown") this.snake.setDirection(0, 1);
        if (key === "ArrowLeft") this.snake.setDirection(-1, 0);
        if (key === "ArrowRight") this.snake.setDirection(1, 0);
    }

    increaseScore() {
        this.score += 1;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
        }
        this.updateHUD();
    }

    updateHUD() {
        document.getElementById("score").textContent = `Score: ${this.score}`;
        document.getElementById("highscore").textContent = `High Score: ${this.highScore}`;
    }

    gameOver() {
        clearInterval(this.intervalId);
        alert("¡Perdiste!");
        location.reload();
    }
}
