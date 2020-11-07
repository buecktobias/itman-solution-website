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
var MovingObject = /** @class */ (function (_super) {
    __extends(MovingObject, _super);
    function MovingObject(game, x, y, size, speed) {
        var _this = _super.call(this, game) || this;
        _this.x = x;
        _this.y = y;
        _this.size = size;
        _this.speed = speed;
        _this.isMovingUp = false;
        _this.isMovingLeft = false;
        _this.isMovingDown = false;
        _this.isMovingRight = false;
        return _this;
    }
    MovingObject.prototype.getRoundedX = function () {
        return Math.round(this.x);
    };
    MovingObject.prototype.getRoundedY = function () {
        return Math.round(this.y);
    };
    MovingObject.prototype.update = function () {
        if (this.isMovingUp) {
            this.moveUp();
        }
        if (this.isMovingDown) {
            this.moveDown();
        }
        if (this.isMovingLeft) {
            this.moveLeft();
        }
        if (this.isMovingRight) {
            this.moveRight();
        }
    };
    MovingObject.prototype.move = function (byX, byY) {
        if (this.canMove(byX, byY)) {
            this.x += byX;
            this.y += byY;
        }
    };
    MovingObject.prototype.canMove = function (byX, byY) {
        var newX = this.x + byX;
        var newY = this.y + byY;
        return this.game.getObjectsAt(newX, newY, this.size).length < 2;
    };
    MovingObject.prototype.moveUp = function () {
        this.move(0, -this.speed);
    };
    MovingObject.prototype.moveLeft = function () {
        this.move(-this.speed, 0);
    };
    MovingObject.prototype.moveDown = function () {
        this.move(0, this.speed);
    };
    MovingObject.prototype.moveRight = function () {
        this.move(this.speed, 0);
    };
    return MovingObject;
}(GameObject));
