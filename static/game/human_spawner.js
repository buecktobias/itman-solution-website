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
var HumanSpawner = /** @class */ (function (_super) {
    __extends(HumanSpawner, _super);
    function HumanSpawner(props) {
        return _super.call(this, props) || this;
    }
    HumanSpawner.prototype.update = function () {
        var randomSpawn = Math.random() * 100;
        var randomX = Math.floor(Math.random() * 500);
        var randomY = Math.floor(Math.random() * 500);
        if (randomSpawn < 1) {
            this.game.addGameObject(new Human(this.game, randomX, randomY));
        }
    };
    return HumanSpawner;
}(GameObject));
