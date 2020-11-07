class MovingObject extends GameObject{
    constructor(game, x, y, speed) {
        super(game);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
    }
    getRoundedX(){
        return Math.round(this.x)
    }

    getRoundedY(){
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
        this.x += byX;
        this.y += byY;
    }

    moveUp(){
        this.move(0, - this.speed)
    }

    moveLeft(){
        this.move(-this.speed,0)
    }

    moveDown(){
        this.move(0,this.speed)
    }
    moveRight(){
        this.move(this.speed,0)
    }
}