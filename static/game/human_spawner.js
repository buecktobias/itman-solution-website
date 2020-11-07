class HumanSpawner extends GameObject{
    constructor(props) {
        super(props);

    }
    update(){
        let randomSpawn = Math.random() * 100;
        let randomX = Math.floor(Math.random() * 500);
        let randomY = Math.floor(Math.random() * 500);
        if (randomSpawn < 1){
            this.game.addGameObject(new Human(this.game, randomX, randomY));
        }
    }

}