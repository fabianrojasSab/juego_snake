const SIZE = 10;

export class Snake {
    constructor() {
        this.body = [{ x: 20, y: 20 }];
        this.direction = { x: 0, y: 0 };
        this.growing = false;
    }

    setDirection(x, y) {
        // Evitar retroceso directo
        if (this.body.length > 1) {
        const nextX = this.body[0].x + x * SIZE;
        const nextY = this.body[0].y + y * SIZE;
            if (nextX === this.body[1].x && nextY === this.body[1].y) {
                return; // evita ir hacia atrás
            } 
        }
        this.direction = { x, y };
    }

    move() {
        const head = this.body[0];
        const newHead = {
        x: head.x + this.direction.x * SIZE,
        y: head.y + this.direction.y * SIZE,
        };

        this.body.unshift(newHead);
        if (this.growing) {
            this.growing = false;
        } else {
            this.body.pop();
        }
    }

    grow() {
        this.growing = true;
    }

    draw(ctx) {
        ctx.fillStyle = "#0077ff";
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, SIZE, SIZE);
        });
    }

    collidesWith(obj) {
        const head = this.body[0];
        return head.x === obj.x && head.y === obj.y;
    }

    hitWall(width, height) {
        const head = this.body[0];
        return (
            head.x < 0 || head.x >= width ||
            head.y < 0 || head.y >= height
        );
    }

    hitSelf() {
        const [head, ...tail] = this.body;
        return tail.some(segment => segment.x === head.x && segment.y === head.y);
    }
}
