class Human extends MovingObject {
    private is_ill: boolean;
    constructor(game, x, y) {
        super(game, x, y, 30, 0.5);
        this.changeDirection();
        this.is_ill = false;
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
        this.game.getObjectsAt(this.x, this.y, this.size * 2);
    }

    draw(ctx) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(this.getRoundedX(), this.getRoundedY(), this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

}