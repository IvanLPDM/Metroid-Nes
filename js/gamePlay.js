class gamePlay extends Phaser.Scene
{
    constructor()
    {
        super({key:'gamePlay'});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("0"); 
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
        this.load.image('ceiling','ceiling.png');
        this.load.image('ceiling1','ceiling1.png');
        this.load.image('ceiling2','ceiling2.png');
        this.load.image('vertical_platform','vertical_platform.png');
        this.load.image('big_platform','big_platform.png');
        this.load.image('left_bound','left_bound.png');
        this.load.image('powerup_platform','powerup_platform.png');
        this.load.image('door_platform','door_platform.png');
        this.load.image('horizontal_platform','horizontal_platform.png');

        //enemies
        this.load.spritesheet('spiky1','spiky1_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('spiky2','spiky2_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bean1','bean1_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bean2','bran2_anim.png',{frameWidth:16,frameHeight:16});
        this.load.spritesheet('bat','bat_anim.png',{frameWidth:16,frameHeight:24});

        this.load.setPath('assets/img/tilesets');
        this.load.image('walls_tileset1','tileset_1.png');
        this.load.image('walls_tileset2','tileset_2.png');


        this.isjumping = false;
        
    }

    create()
    {

        this.map = this.add.tilemap('metroidplatforms');
        
        this.map.addTilesetImage('walls_tileset1');
        //this.map.addTilesetImage('walls_tileset2');

        this.walls = this.map.createLayer('plataformas','walls_tileset1');
        this.map.setCollisionByExclusion(-1,true,true,'plataformas');


        this.bullet = this.physics.add.sprite(config.width/2,config.height,'bullet').setScale(1);

        //this.map.createLayer('capa de patrones 1', tileset);

        this.player = this.physics.add.sprite(config.width/2,config.height/2,'samus_idle');
        //this.player = new playerPrefab(config.width/2,config.height/2,'samus_idle');
        this.player.setCollideWorldBounds(true);
        

        //this.spiky1 = this.physics.add.sprite(config.width/2 + 20,config.height/2,'spiky1');
        
        this.spiky1 = new spikyPrefab(this,config.width/2 + 20,config.height/2,'spiky1').setOrigin(0,1);
        //this.spiky1.setCollideWorldBounds(true);
        this.bat = new batPrefab(this,config.width/2 + 40, 50,'bat')

        this.platform = this.physics.add.sprite(config.width/2 + 140,config.height - 20,'plataforma');
        //tilemap
        this.platform = this.physics.add.sprite(config.width/2 - 24,config.height - 40,'plataforma');
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);
        this.ground = this.physics.add.sprite(0,config.height,'ground').setOrigin(0,1);
        this.ground.body.setAllowGravity(false);
        this.ground.body.setImmovable(true);
        this.ceiling1 = this.physics.add.sprite(0,0,'ceiling1').setOrigin(0,0);
        this.ceiling1.body.setAllowGravity(false);
        this.ceiling1.body.setImmovable(true);
        this.ceiling2 = this.physics.add.sprite(config.width/2 - 66,0,'ceiling2').setOrigin(0,0);
        this.ceiling2.body.setAllowGravity(false);
        this.ceiling2.body.setImmovable(true);
        this.platform2 = this.physics.add.sprite(config.width/2 - 80,config.height - 80,'vertical_platform').setOrigin(0,1);
        this.platform2.body.setAllowGravity(false);
        this.platform2.body.setImmovable(true);
        this.platform3 = this.physics.add.sprite(config.width/2,config.height - 80,'vertical_platform').setOrigin(0,1);
        this.platform3.body.setAllowGravity(false);
        this.platform3.body.setImmovable(true);
        this.platform3.flipX = !this.platform3.flipX;
        this.platform4 = this.physics.add.sprite(config.width/2 - 250,config.height - 48,'big_platform').setOrigin(0,1);
        this.platform4.body.setAllowGravity(false);
        this.platform4.body.setImmovable(true);
        this.platform5 = this.physics.add.sprite(config.width/2 - 266,config.height - 80,'big_platform').setOrigin(0,1);
        this.platform5.body.setAllowGravity(false);
        this.platform5.body.setImmovable(true);
        this.platform6 = this.physics.add.sprite(config.width/2 - 282,config.height - 112,'big_platform').setOrigin(0,1);
        this.platform6.body.setAllowGravity(false);
        this.platform6.body.setImmovable(true);
        this.bound = this.physics.add.sprite(0,config.height,'left_bound').setOrigin(0,1);
        this.bound.body.setAllowGravity(false);
        this.bound.body.setImmovable(true);
        this.powerupplatform = this.physics.add.sprite(128,config.height - 32,'powerup_platform').setOrigin(0,1);
        this.powerupplatform.body.setAllowGravity(false);
        this.powerupplatform.body.setImmovable(true);
        this.doorplat = this.physics.add.sprite(config.width,config.height - 32,'door_platform').setOrigin(1,1);
        this.doorplat.body.setAllowGravity(false);
        this.doorplat.body.setImmovable(true);
        this.doorplat1 = this.physics.add.sprite(config.width,0,'door_platform').setOrigin(1,0);
        this.doorplat1.body.setAllowGravity(false);
        this.doorplat1.body.setImmovable(true);
        this.platform7 = this.physics.add.sprite(config.width - 32,config.height - 96,'horizontal_platform').setOrigin(1,1);
        this.platform7.body.setAllowGravity(false);
        this.platform7.body.setImmovable(true);

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
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);
        this.physics.add.collider(this.player, this.platform4);
        this.physics.add.collider(this.player, this.platform5);
        this.physics.add.collider(this.player, this.platform6);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.bound);
        this.physics.add.collider(this.player, this.ceiling1);
        this.physics.add.collider(this.player, this.ceiling2);
        this.physics.add.collider(this.player, this.platform4);
        this.physics.add.collider(this.player, this.powerupplatform);
        this.physics.add.collider(this.player, this.platform7);
        this.physics.add.collider(this.player, this.doorplat);
        this.physics.add.collider(this.player, this.doorplat1);

        this.physics.add.collider(this.player, this.potionPool, this.HealPlayer, null, this);
        this.physics.add.collider(this.spiky1, this.platform);
        this.physics.add.collider(this.spiky1, this.ground);
        this.physics.add.collider(this.spiky1, this.ceiling);

        this.physics.add.collider(this.bat, this.platform);
        this.physics.add.collider(this.bat, this.ground);
        this.physics.add.collider(this.bat, this.ceiling);

        this.physics.add.collider(this.player, this.spiky1,this.DamageSamus,null,this);

        this.physics.add.overlap(this.player, this.spiky1,this.DamageSamus,null,this);

        this.physics.add.collider(this.spiky1, this.platform);

        this.physics.add.overlap(this.bulletPool, this.bat,this.DamageEnemy,null,this);
        
        this.physics.add.collider(this.bulletPool, this.bat,this.DamageEnemy,null,this);
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

        DamageEnemy(enemy)
        {
        
            enemy.health--;

            if(enemy.health <= 0)
            {
                this.dropPotion(enemy);
                enemy.destroy();
            }
        
        }

        GirarEnemy()
        {
            for (const enemy of this.enemiesPool.getChildren()) {
                handleEnemy(enemy);
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
            this.player.setVelocityX(-gamePrefs.Player_SPEED);
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
            this.player.setVelocityX(gamePrefs.Player_SPEED);
            this.player.setFlipX(false);
            if(this.player.body.onFloor()){
            this.player.anims.play('walk',true);
            }
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            //this.nave.anims.play('right',true);
        }
        else{

            this.player.setVelocityX(0)
            if(this.player.body.onFloor()){
                this.player.anims.play('idle',true);
                }
        }
        if(this.cursores.space.isDown && !this.isjumping && this.player.body.onFloor())
        {
            this.player.setVelocityY(-265);
            this.player.anims.play('jump',true);
            this.isjumping = true;
            
        }

        if(this.player.body.onFloor()){
            this.isjumping = false;
        }

        //this.spiky1.anims.play('spiky_horizontal',true);
        
    }

}