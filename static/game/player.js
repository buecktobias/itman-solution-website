var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        var _this = _super.call(this, game, 500, 500, 50, 2) || this;
        _this.isControllableClass = true;
        return _this;
    }
    Player.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    Player.prototype.draw = function (ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.getRoundedX(), this.getRoundedY(), this.size, 0, 2 * Math.PI);
        ctx.fill();
    };
    Player.prototype.checkKeyUp = function (e) {
        if (e.keyCode === 87) { // W
            this.isMovingUp = false;
        }
        if (e.keyCode === 65) { // A
            this.isMovingLeft = false;
        }
        if (e.keyCode === 83) { // S
            this.isMovingDown = false;
        }
        if (e.keyCode === 68) { // D
            this.isMovingRight = false;
        }
    };
    Player.prototype.checkKeyDown = function (e) {
        if (e.keyCode === 87) { // W
            this.isMovingUp = true;
        }
        if (e.keyCode === 65) { // A
            this.isMovingLeft = true;
        }
        if (e.keyCode === 83) { // S
            this.isMovingDown = true;
        }
        if (e.keyCode === 68) { // D
            this.isMovingRight = true;
        }
    };
    return Player;
}(MovingObject));
