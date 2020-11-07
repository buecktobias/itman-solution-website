class Player {
    constructor() {
        this.x = 500;
        this.y = 500;
        this.speed = 1;
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
    }

    update(){
        if (this.isMovingUp){
            this.moveUp()
        }
        if (this.isMovingDown){
            this.moveDown()
        }
        if (this.isMovingLeft){
            this.moveLeft()
        }
        if (this.isMovingRight){
            this.moveRight()
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
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

class Game{

    constructor() {
        this.body = document.getElementById("body");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.p1 = new Player();
        this.checkControls();
        setInterval(function (){gameLoop();}, 5);
    }

    resetCanvas() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, 600, 600)
    }

    checkKeyDown(e) {
        this.p1.checkKeyDown(e);
    }

    checkKeyUp(e) {
        this.p1.checkKeyUp(e);
    }

    checkControls() {
        let t = this;
        this.body.addEventListener("keydown", function (e){t.checkKeyDown(e)});
        this.body.addEventListener("keyup", function (e){t.checkKeyUp(e)});
    }


}
let our_game = new Game();

function gameLoop() {
    our_game.resetCanvas();
    our_game.p1.draw(our_game.ctx);
    our_game.p1.update();
}



