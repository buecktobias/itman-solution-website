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
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(game, x, y) {
        var _this = _super.call(this, game, x, y, 30, 0.5) || this;
        _this.changeDirection();
        _this.is_ill = false;
        return _this;
    }
    Human.prototype.changeDirection = function () {
        var randomDirection = Math.floor(Math.random() * 6);
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        switch (randomDirection) {
            case 0:
                this.isMovingUp = true;
                break;
            case 1:
                this.isMovingRight = true;
                break;
            case 2:
                this.isMovingDown = true;
                break;
            case 3:
                this.isMovingLeft = true;
                break;
            default:
                break;
        }
    };
    Human.prototype.update = function () {
        _super.prototype.update.call(this);
        var randomMove = Math.random() * 100;
        if (randomMove < 0.1) {
            this.changeDirection();
        }
        this.game.getObjectsAt(this.x, this.y, this.size * 2);
    };
    Human.prototype.draw = function (ctx) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(this.getRoundedX(), this.getRoundedY(), this.size, 0, 2 * Math.PI);
        ctx.fill();
    };
    return Human;
}(MovingObject));
