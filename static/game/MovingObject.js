class MovingObject extends GameObject {
    constructor(game, x, y, size, speed) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
    }

    getRoundedX() {
        return Math.round(this.x)
    }

    getRoundedY() {
        return Math.round(this.y)
    }


    update() {
        if (this.isMovingUp) {
            this.moveUp()
        }
        if (this.isMovingDown) {
            this.moveDown()
        }
        if (this.isMovingLeft) {
            this.moveLeft()
        }
        if (this.isMovingRight) {
            this.moveRight()
        }
    }

    move(byX, byY) {
        if (this.canMove(byX, byY)) {
            this.x += byX;
            this.y += byY;
        }
    }

    canMove(byX, byY) {
        let newX = this.x + byX
        let newY = this.y + byY
        return this.game.getObjectsAt(newX, newY, this.size).length < 2;
    }

    moveUp() {
        this.move(0, -this.speed)
    }

    moveLeft() {
        this.move(-this.speed, 0)
    }

    moveDown() {
        this.move(0, this.speed)
    }

    moveRight() {
        this.move(this.speed, 0)
    }
}