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
        let width = this.canvas.width;
        let height = this.canvas.height;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, width, height)
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