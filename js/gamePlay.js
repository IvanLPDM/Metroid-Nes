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
        this.load.image('samus','image.png');
        

        
        this.load.setPath('assets/img/sprites');
        this.load.spritesheet('samus_idle','samus_idle.png',{frameWidth:20,frameHeight:32});
        this.load.spritesheet('samus_walk','samus_walk.png',{frameWidth:22,frameHeight:32});
        this.load.spritesheet('samus_jump','samus_jump.png',{frameWidth:18,frameHeight:25});
        this.load.image('plataforma','platform.png');
        this.load.image('ground','ground.png');
        this.load.image('potion','heal_drop.png');
        //enemies
        this.load.spritesheet('spiky1','spiky1_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('spiky2','spiky2_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bean1','bean1_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bean2','bran2_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bat','bat_anim.png',{frameWidth:16,frameHeight:24});


        this.isjumping = false;
        
    }

    create()
    {
        this.bullet = this.physics.add.sprite(config.width/2,config.height,'bullet').setScale(1);

        //this.map.createLayer('capa de patrones 1', tileset);

        this.player = this.physics.add.sprite(config.width/2,config.height/2,'samus_idle');
        //this.player = new playerPrefab(config.width/2,config.height/2,'samus_idle');
        this.player.setCollideWorldBounds(true);

        //this.spiky1 = this.physics.add.sprite(config.width/2 + 20,config.height/2,'spiky1');
        
        this.spiky1 = new spikyPrefab(this,config.width/2 + 20,config.height/2,'spiky1')
        //this.spiky1.setCollideWorldBounds(true);
        this.bat = new batPrefab(this,config.width/2 + 40, 50,'bat')

        this.platform = this.physics.add.sprite(config.width/2 + 140,config.height - 20,'plataforma');
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);

        this.cursores = this.input.keyboard.createCursorKeys();

        
        this.health = 100;

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

        this.loadAnimations();

        this.physics.add.collider(this.player, this.platform);

        this.physics.add.collider(this.player, this.potionPool, this.HealPlayer, null, this);

        this.physics.add.overlap(this.player, this.spiky1,this.DamageSamus,null,this);

        this.physics.add.collider(this.spiky1, this.platform);

        this.physics.add.overlap(this.bulletPool, this.bat,this.DamageEnemy,null,this);
        
    }

    DamageSamus(player,spiky1){

        //player.health--;

        //if(player.health <= 0)
            player.body.reset(65,100);
        //this.scene.cameras.main.shake(500,0.05);
        //this.scene.cameras.main.flash(250,255,0,0);  
    }

    HealPlayer(player, potion)
    {
        player.health += 20;
        potion.destroy();
    }

    DamageEnemy(enemy){
        
        enemy.health--;

        if(enemy.health <= 0)
        {
            this.dropPotion(enemy);
            enemy.destroy();
        }
        
    }

        loadPools()
        {
            this.bulletPool = this.physics.add.group();
            this.potionPool = this.physics.add.group();
        }

        dropPotion(enemy) {
            const potion = this.potionPool.get(enemy.x, enemy.y, 'potion');
        
            if (!potion) {
                const newPotion = new Potion(this, enemy.x, enemy.y, 'potion');
                newPotion.body.setAllowGravity(false);
                newPotion.body.setVelocity(0, 0);
                newPotion.body.setImmovable(true);
                this.potionPool.add(newPotion);
            } else {
                potion.body.reset(enemy.x, enemy.y);
                potion.body.setAllowGravity(false);
                potion.body.setVelocity(0, 0);
                potion.body.setImmovable(true);
                potion.setActive(true);
                potion.setVisible(true);
            }
        }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);

        this.shootPositionX = this.player.x + 8;
        this.shootPositionY = this.player.y - 7;
        
        
        if(!_bullet)
        {//Que no? La creo

            if(this.cursores.up.isDown)
            {
                this.shootPositionX = this.player.x + 4;
                this.shootPositionY = this.player.y - 4;
                this.directionVelocityBulletX = 0;
                this.directionVelocityBulletY = -300;
            }
            else if(this.cursores.left.isDown)
            {
                this.shootPositionX = this.player.x - 16;
                this.shootPositionY = this.player.y - 7;

                this.Initdirection = true;

                this.directionVelocityBulletX = -300;
                this.directionVelocityBulletY = 0;
            }
            else if(this.cursores.right.isDown)
            {
                this.shootPositionX = this.player.x + 8;
                this.shootPositionY = this.player.y - 7;

                this.Initdirection = true;

                this.directionVelocityBulletX = 300;
                this.directionVelocityBulletY = 0;
            }
            
                console.log('creando bala');
                _bullet = new bulletPrefab(this,this.shootPositionX, this.shootPositionY,'bullet');
                this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            if(this.cursores.left.isDown)
            {
                this.shootPositionX = this.player.x - 20;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.cursores.right.isDown)
            {
                this.shootPositionX = this.player.x + 20;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.cursores.up.isDown)
            {
                this.shootPositionX = this.player.x;
                this.shootPositionY = this.player.y - 20;
            }
            console.log('reciclando bala');
            _bullet.body.reset(this.shootPositionX, this.shootPositionY);
            _bullet.active = true;
        }
        _bullet.body.setAllowGravity(false);
        _bullet.body.setVelocity(this.directionVelocityBulletX, this.directionVelocityBulletY);
        //Hago cosas con la bala
        //Dar velocidad
        //
        //Ejecuta sonido
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

        this.anims.create(
            {
                key: 'spiky_horizontal',
                frames:this.anims.generateFrameNumbers('spiky1', {start:0, end: 1}),
                frameRate: 5,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'spiky_vertical',
                frames:this.anims.generateFrameNumbers('spiky1', {start:2, end: 3}),
                frameRate: 5,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'bat_anim',
                frames:this.anims.generateFrameNumbers('bat', {start:0, end: 2}),
                frameRate: 5,
                repeat: -1
            }
        );
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
            this.player.setVelocityY(-200);
            this.player.anims.play('jump',true);
            this.isjumping = true;
            
        }

        if(this.player.body.onFloor()){
            this.isjumping = false;
        }

        //this.spiky1.anims.play('spiky_horizontal',true);
        
    }

}