var Game = /** @class */ (function () {
    function Game() {
        this.body = document.getElementById("body");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        // @ts-ignore
        var p1 = new Player(this);
        // @ts-ignore
        var humanSpawner = new HumanSpawner(this);
        this.game_objects = [p1, humanSpawner];
        this.checkControls();
        setInterval(function () {
            gameLoop();
        }, 5);
    }
    Game.prototype.getObjectsAt = function (atX, atY, objectsSize) {
        // @ts-ignore
        var all_moving_objects = this.game_objects.filter(function (object) { return object instanceof MovingObject; });
        return all_moving_objects.filter(function (object) { return Math.abs(object.x - atX) < object.size + objectsSize && Math.abs(object.y - atY) < object.size + objectsSize; });
    };
    Game.prototype.addGameObject = function (new_game_object) {
        this.game_objects.push(new_game_object);
    };
    Game.prototype.resetCanvas = function () {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    Game.prototype.checkKeyDown = function (e) {
        // @ts-ignore
        var controllable = this.game_objects.filter(function (object) { return object instanceof Player; });
        controllable.forEach(function (object) { return object.checkKeyDown(e); });
    };
    Game.prototype.checkKeyUp = function (e) {
        // @ts-ignore
        var controllable = this.game_objects.filter(function (object) { return object instanceof Player; });
        controllable.forEach(function (object) { return object.checkKeyUp(e); });
    };
    Game.prototype.checkControls = function () {
        var t = this;
        this.body.addEventListener("keydown", function (e) {
            t.checkKeyDown(e);
        });
        this.body.addEventListener("keyup", function (e) {
            t.checkKeyUp(e);
        });
    };
    return Game;
}());
var our_game = new Game();
function gameLoop() {
    our_game.resetCanvas();
    our_game.game_objects.forEach(function (object) { return object.update(); });
    our_game.game_objects.forEach(function (object) { return object.draw(our_game.ctx); });
}
