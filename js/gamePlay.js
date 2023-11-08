class gamePlay extends Phaser.Scene
{
    constructor()
    {
        super({key:'gamePlay'});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('samus','image.png');
    }

    create()
    {
        this.player = this.physics.add.sprite(config.width/2,config.height/2,'samus').setScale(2);
        this.player.setCollideWorldBounds(true);

        this.cursores = this.input.keyboard.createCursorKeys();
    }
    
    update()
    {
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.player.x -= gamePrefs.Player_SPEED;
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            //this.player.anims.play('left',true);
        }else
        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.player.x += gamePrefs.Player_SPEED;
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            //this.nave.anims.play('right',true);
        }
        if(this.cursores.space.isDown)
        {
            this.player.y -= 4;
        }
        
    }
}