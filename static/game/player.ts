class Player extends MovingObject {
    constructor(game) {
        super(game, 500, 500, 50, 2);

    }

    update(){
        super.update();
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.getRoundedX(), this.getRoundedY(), this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    checkKeyUp(e){
        if (e.keyCode === 87) { // W
            this.isMovingUp = false
        }
        if (e.keyCode === 65){ // A
            this.isMovingLeft = false;
        }
        if(e.keyCode === 83){ // S
            this.isMovingDown = false;
        }
        if(e.keyCode === 68){ // D
            this.isMovingRight = false;
        }
    }

    checkKeyDown(e){
        if (e.keyCode === 87) { // W
            this.isMovingUp = true;
        }
        if (e.keyCode === 65){ // A
            this.isMovingLeft = true;
        }
        if(e.keyCode === 83){ // S
            this.isMovingDown = true;
        }
        if(e.keyCode === 68){ // D
            this.isMovingRight = true;
        }
    }
}