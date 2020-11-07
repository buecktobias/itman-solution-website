class Human extends MovingObject {
    constructor(game, x, y) {
        super(game, x, y, 0.5);
        this.changeDirection();
    }

    changeDirection() {
        let randomDirection = Math.floor(Math.random() * 6);
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        switch (randomDirection) {
            case 0:
                this.isMovingUp = true
                break
            case 1:
                this.isMovingRight = true;
                break
            case 2:
                this.isMovingDown = true;
                break;
            case 3:
                this.isMovingLeft = true;
                break;
            default:
                break;
        }
    }

    update() {
        super.update();
        let randomMove = Math.random() * 100;
        if (randomMove < 0.1) {
            this.changeDirection();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(this.getRoundedX(), this.getRoundedY(), 30, 0, 2 * Math.PI);
        ctx.fill();
    }

}