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
        this.load.image('samus','/sprites/samus_idle.png');
        this.load.image('bullet','/sprites/bullet.png');
    }

    create()
    {
        this.player = this.physics.add.sprite(config.width/2,config.height/2,'samus').setScale(2);
        this.bullet = this.physics.add.sprite(config.width/2,config.height,'bullet').setScale(1);
        this.player.setCollideWorldBounds(true);

        this.cursores = this.input.keyboard.createCursorKeys();

 
        this.cursores.down.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        ); 

        this.loadPools();
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
    }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);
        this.shootPositionX = this.player.x + 50;
        this.shootPositionY = this.player.y - 10;
        this.directionVelocityBulletX = 0;
        this.directionVelocityBulletY = 0;
        
        if(!_bullet)
        {//Que no? La creo

            if(this.cursores.up.isDown)
            {
                this.shootPositionX = this.player.x + 50;
                this.shootPositionY = this.player.y - 50;
                this.directionVelocityBulletX = 0;
                this.directionVelocityBulletY = 0;
            }
            else if(this.cursores.left.isDown)
            {
                this.shootPositionX = this.player.x - 50;
                this.shootPositionY = this.player.y - 10;

                this.directionVelocityBulletX = -10;
                this.directionVelocityBulletY = 0;
            }
            else if(this.cursores.right.isDown)
            {
                this.shootPositionX = this.player.x + 50;
                this.shootPositionY = this.player.y - 10;

                this.directionVelocityBulletX = 0;
                this.directionVelocityBulletY = 0;
            }
            
                console.log('creando bala');
                _bullet = new bulletPrefab(this,this.shootPositionX, this.shootPositionY,'bullet');
                this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            if(this.cursores.left.isDown)
            {
                this.shootPositionX = this.player.x - 50;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.cursores.right.isDown)
            {
                this.shootPositionX = this.player.x + 50;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.cursores.up.isDown)
            {
                this.shootPositionX = this.player.x;
                this.shootPositionY = this.player.y - 50;
            }
            console.log('reciclando bala');
            _bullet.body.reset(this.shootPositionX, this.shootPositionY);
            _bullet.active = true;
        }
        _bullet.body.setVelocitY(1);
        //Hago cosas con la bala
        //Dar velocidad
        //
        //Ejecuta sonido
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