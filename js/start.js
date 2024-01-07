class startScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'startScene'});
    }

    preload() {
        this.load.audio('StartAudio', 'assets/sounds/StartTheme.mp3');

        this.load.setPath('assets/img/sprites');

        this.load.image('bg', 'startSceneBG.png');

        
    }

    create() {
        this.background = this.add.sprite(config.width / 2, config.height, 'bg').setOrigin(0.5, 1).setScale(8);
        this.StartSample = this.sound.add('StartAudio');
        this.StartSample.play();

        this.input.keyboard.on('keydown-S', function (event) {
            this.startGame(); 
        }, this);
    }

    startGame() {
        
        this.scene.start('gamePlay');
        this.StartSample.pause();
    }
}