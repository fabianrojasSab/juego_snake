const SIZE = 10;

export class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.reposition();
    }

    reposition() {
        const max = 60; // 600px / 10px por bloque
        this.x = Math.floor(Math.random() * max) * SIZE;
        this.y = Math.floor(Math.random() * max) * SIZE;
    }

    draw(ctx) {
        ctx.fillStyle = "#ff3333";
        ctx.fillRect(this.x, this.y, SIZE, SIZE);
    }
}
