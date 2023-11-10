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

        this.load.setPath('assets/img/sprites');
        this.load.spritesheet('samus_idle','samus_idle.png',{frameWidth:20,frameHeight:32});
        this.load.spritesheet('samus_walk','samus_walk.png',{frameWidth:22,frameHeight:32});
        this.load.spritesheet('samus_jump','samus_jump.png',{frameWidth:18,frameHeight:25});

        this.isjumping = false;

    }

    create()
    {

        //this.map.createLayer('capa de patrones 1', tileset);

        this.player = this.physics.add.sprite(config.width/2,config.height/2,'samus_idle');
        this.player.setCollideWorldBounds(true);

        this.cursores = this.input.keyboard.createCursorKeys();

        this.loadAnimations();
    }

    loadAnimations()
    {        
        this.anims.create(
        {
            key: 'walk',
            frames:this.anims.generateFrameNumbers('samus_walk', {start:0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
            {
                key: 'idle',
                frames:this.anims.generateFrameNumbers('samus_idle', {start:0, end: 0}),
                frameRate: 10,
                repeat: -1
            }); 

            this.anims.create(
                {
                    key: 'jump',
                    frames:this.anims.generateFrameNumbers('samus_jump', {start:0, end: 0}),
                    frameRate: 10,
                    repeat: -1
                });
    }
    
    update()
    {
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.player.x -= gamePrefs.Player_SPEED;
            this.player.setFlipX(true);
            if(this.player.body.onFloor()){
                this.player.anims.play('walk',true);
                }
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            //this.player.anims.play('left',true);
        }else
        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.player.x += gamePrefs.Player_SPEED;
            this.player.setFlipX(false);
            if(this.player.body.onFloor()){
            this.player.anims.play('walk',true);
            }
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            //this.nave.anims.play('right',true);
        }
        else{

            if(this.player.body.onFloor()){
                this.player.anims.play('idle',true);
                }
        }
        if(this.cursores.space.isDown && !this.isjumping && this.player.body.onFloor())
        {
            this.player.setVelocityY(-100);
            this.player.anims.play('jump',true);
            this.isjumping = true;
            
        }

        if(this.player.body.onFloor()){
            this.isjumping = false;
        }
        
    }

}