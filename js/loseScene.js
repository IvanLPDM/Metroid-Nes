class loseScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'loseScene'});
    }

    preload() {
        //this.load.setPath('assets/img/sprites');
        //this.load.image('bg', 'startSceneBG.png');
    }

    create() {
        //this.background = this.add.sprite(config.width / 2, config.height, 'bg').setOrigin(0.5, 1);


        this.restartText = this.add.text(config.width / 2, config.height / 1.5, 'Puntuacion', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.restartText = this.add.text(config.width / 2, config.height / 2, 'Press R to restart', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-R', function (event) {
            this.startGame();
        }, this);
    }

    startGame() {
        
        this.scene.start('gamePlay');
    }
}