class WinScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'WinScene'});
    }

    preload() {
        this.load.audio('FinishAudio', 'assets/sounds/FinishTheme.mp3');

        this.load.setPath('assets/img/sprites');

        this.load.image('bgFinal', 'FinishScreen.png');

        
    }

    create() {
        this.background = this.add.sprite(config.width / 2, config.height, 'bgFinal').setOrigin(0.5, 1).setScale(4);
        this.StartSample = this.sound.add('FinishAudio');
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