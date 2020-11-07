
class Game {
    private body: any;
    private canvas: any;
    public ctx: any;
    private readonly width: number;
    private readonly height: number;
    public game_objects: any;

    constructor() {
        this.body = document.getElementById("body");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        // @ts-ignore
        let p1 = new Player(this);
        // @ts-ignore
        let humanSpawner = new HumanSpawner(this);
        this.game_objects = [p1, humanSpawner];
        this.checkControls();
        setInterval(function () {
            gameLoop();
        }, 5);
    }

    getObjectsAt(atX, atY, objectsSize){
        // @ts-ignore
        let all_moving_objects = this.game_objects.filter(object => object instanceof MovingObject)
        return all_moving_objects.filter(object => Math.abs(object.x - atX) < object.size + objectsSize && Math.abs(object.y - atY) < object.size + objectsSize)
    }

    addGameObject(new_game_object){
        this.game_objects.push(new_game_object);
    }

    resetCanvas() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    checkKeyDown(e) {
        // @ts-ignore
        let controllable = this.game_objects.filter(object => object instanceof Player)
        controllable.forEach(object => object.checkKeyDown(e))
    }

    checkKeyUp(e) {
                // @ts-ignore
        let controllable = this.game_objects.filter(object => object instanceof Player)
        controllable.forEach(object => object.checkKeyUp(e))
    }

    checkControls() {
        let t = this;
        this.body.addEventListener("keydown", function (e) {
            t.checkKeyDown(e)
        });
        this.body.addEventListener("keyup", function (e) {
            t.checkKeyUp(e)
        });
    }


}

let our_game = new Game();

function gameLoop() {
    our_game.resetCanvas();
    our_game.game_objects.forEach(object => object.update());
    our_game.game_objects.forEach(object => object.draw(our_game.ctx));
}
