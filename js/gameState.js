class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('bg_back','background_back.png');
        this.load.image('bg_frontal','background_frontal.png');
        this.load.spritesheet('nave','naveAnim.png',
        {frameWidth:16,frameHeight:24});
        this.load.image('bullet','spr_bullet_0.png');
        this.load.image('enemy_bullet','spr_enemy_bullet_0.png');
        this.load.spritesheet('enemy','enemy-medium.png',
        {frameWidth:32,frameHeight:16});
        this.load.spritesheet('shield','spr_armor.png',
        {frameWidth:66,frameHeight:28});
        this.load.image('scoreUI','spr_score_0.png');
        this.load.spritesheet('explosion','explosion.png',
        {frameWidth:16,frameHeight:16});
        this.load.spritesheet('powerUp1','spr_power_up.png',
        {frameWidth:16,frameHeight:16});
        this.load.spritesheet('powerUp2','spr_power_up_2.png',
        {frameWidth:16,frameHeight:16});
        this.load.image('powerUp', 'spr_power_up_2_0.png');
        this.load.setPath('assets/sounds');
        this.load.audio('shoot','snd_shoot.mp3');
        this.load.audio('enemy_shoot','snd_enemy_laser.wav');
        
    }

    create()
    { //Pinta assets en pantalla


        

        this.bg_back = this.add.tileSprite
        (0,0,config.width,config.height,'bg_back').setOrigin(0);
        this.bg_frontal = this.add.tileSprite
        (0,0,config.width,config.height,'bg_frontal').setOrigin(0);
        
        var powerUpShoot = false;
        
        //this.nave = this.physics.add.sprite(config.width/2,config.height*.95,'nave');
        //this.nave.body.collideWorldBounds = true;
        this.nave = new navePrefab(this,config.width/2,config.height*.95,'nave');

        

        //this.manolo = this.add.sprite(config.width/2, config.height/2, 'powerUp1');
        
        this.loadAnimations();
        this.loadPools();
        this.loadSounds();
        //this.nave.anims.play('idle');
        
        this.shield = this.add.sprite(5,5,'shield')
        .setOrigin(0)
        .setScale(.5)
        .setDepth(1);
        //this.nave.health=gamePrefs.MAX_HEALTH;
        this.nave.setShield(this.shield);
        this.shield.setFrame(this.nave.health);        

        this.scoreUI = this.add.sprite(config.width-5,5,'scoreUI')
        .setOrigin(1,0)
        .setScale(.5)
        .setDepth(1);
        this.score = 0;
        this.scoreText = this.add.text
        (
            config.width-8,
            19,
            this.score,
            {
                fontFamily:'Arial',
                fill:'#FFFFFF',
                fontSize:12
            }
        ).setOrigin(1)
        .setDepth(1);

        this.cursores = this.input.keyboard.createCursorKeys();
        
        this.cursores.space.on
        (
            'down',
            function()
            {
                this.createBullet();
            },
            this
        ); 

        
       /* this.powerUpTimer = this.time.addEvent({
            delay: 1000, //ms
            callback: this.createBullet,
            callbackScope: this,
            loop: false,
            repeat: 9,
        });*/

        
        

        /*
        this.bulletTimer = this.time.addEvent
        (
            {
                delay: 200, //ms
                callback: this.createBullet,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );
        */
        this.enemyTimer = this.time.addEvent
        (
            {
                delay: 2000, //ms
                callback: this.createEnemy,
                callbackScope:this,
                loop:true //repeat: -1
            }
        );

        
        
        //this.physics.add.collider
        this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );

        this.physics.add.overlap
        (
            this.nave,
            this.enemyBulletPool,
            this.nave.damage,
            null,
            this.nave
        );

        this.physics.add.overlap
        (
            this.nave,
            this.enemyPool,
            this.nave.reset,
            null,
            this.nave
        );

        this.physics.add.overlap
        (
            this.nave,
            this.powerUpHealPool,
            this.takePowerUp,
            null,
            this
        );

        this.physics.add.overlap
        (
            this.nave,
            this.powerUpShootPool,
            this.takePowerUpShoot,
            null,
            this.nave
        );
    }
    

    loadSounds()
    {
        this.shoot=this.sound.add('shoot');
        this.enemy_shoot=this.sound.add('enemy_shoot');
    }

    takePowerUpShoot(_nave, _powerUp)
    {
        _powerUp.destroy();
        
    }

    takePowerUp(_nave, _powerUp)
    {
        _powerUp.destroy();
        this.HealPlayer();
    }

    

    killEnemy(_bullet,_enemy)
    {
        //_bullet.destroy();
        //_enemy.destroy();
        _bullet.deActivate();
        
        _enemy.health--;
        if(_enemy.health>0)
        {
            //invulnerabilidad durante X segundos
        }else if(_enemy.health==0)
        {
            var randomChance = Phaser.Math.Between(1, 10);
            if(randomChance == 2)
            {
                randomChance = Phaser.Math.Between(1, 2);
                if(randomChance == 1)
                    this.createPowerUp(_enemy);
                else
                    this.createPowerUpShoot(_enemy);
            }
            this.time.removeEvent(_enemy.shootingTimer);
            _enemy.deActivate();            
            this.score +=100;
            this.scoreText.text=this.score;
            
        }
    }

    HealPlayer()
    {
        this.nave.health += gamePrefs.POWER_UP_HEAL;

        if(this.nave.health > gamePrefs.MAX_HEALTH)
        {
            this.nave.health = gamePrefs.MAX_HEALTH;
        }

        this.shield.setFrame(this.nave.health);
    }

    loadAnimations()
    {
        
        this.anims.create(
        {
            key: 'idle',
            frames:this.anims.generateFrameNumbers('nave', {start:0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
        {
            key: 'left',
            frames:this.anims.generateFrameNumbers('nave', {start:2, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'right',
            frames:this.anims.generateFrameNumbers('nave', {start:4, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
        {
            key: 'enemy_idle',
            frames:this.anims.generateFrameNumbers('enemy', {start:0, end: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explosionAnim',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0,
            showOnStart:true,
            hideOnComplete:true            
        });
        this.anims.create({
            key: 'PowerUpHealAnim',
            frames: this.anims.generateFrameNumbers('powerUp1', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,       
        });
        this.anims.create({
            key: 'PowerUpShootAnim',
            frames: this.anims.generateFrameNumbers('powerUp2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,       
        });
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
        this.explosionPool = this.physics.add.group();
        this.powerUpHealPool = this.physics.add.group();
        this.powerUpShootPool = this.physics.add.group();
    }

    createExplosion(_bullet)
   {
       var _explosion = this.explosionPool.getFirst(false);  //Buscamos en el pool de explosiones si hay alguna reutilizable
       if(!_explosion)
       {//No hay
           console.log('Create explosion');
           _explosion = new explosionPrefab(this,_bullet.x,_bullet.y,'explosion');
           this.explosionPool.add(_explosion);
       }else
       {//Si hay
           console.log('Reset explosion');
           _explosion.active = true;
           _explosion.x=_bullet.x;
           _explosion.y=_bullet.y;
           _explosion.anims.play('explosionAnim');
       }        
   }

    createBullet()
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.bulletPool.getFirst(false);
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,this.nave.x,this.nave.body.top,'bullet');
            this.bulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(this.nave.x,this.nave.body.top);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        //Ejecuta sonido
        this.shoot.play();
    }


    createPowerUp(_enemy)
    {
        var _powerUp = this.powerUpHealPool.getFirst(false);

        if(!_powerUp)
        {//Que no? La creo
            console.log('creando powerUp');
            _powerUp = new PowerUpPrefab(this,_enemy.x,_enemy.body.bottom,'powerUp1'); 
            this.powerUpHealPool.add(_powerUp);
        }
        else
        {//Que si? La reciclo
            console.log('reciclando powerUp');
            _powerUp.body.reset(_enemy.x,_enemy.body.bottom);
            _powerUp.active = true;
        }

        _powerUp.body.setVelocityY(gamePrefs.POWER_UP_SPEED);
    }

    createPowerUpShoot(_enemy)
    {
        var _powerUp = this.powerUpShootPool.getFirst(false);

        if(!_powerUp)
        {//Que no? La creo
            console.log('creando powerUp');
            _powerUp = new PowerUpShootPrefab(this,_enemy.x,_enemy.body.bottom,'powerUp2'); 
            this.powerUpShootPool.add(_powerUp);
        }
        else
        {//Que si? La reciclo
            console.log('reciclando powerUp');
            _powerUp.body.reset(_enemy.x,_enemy.body.bottom);
            _powerUp.active = true;
        }

        _powerUp.body.setVelocityY(gamePrefs.POWER_UP_SPEED);
    }

    createEnemy()
    {
        //Mirar si hay algun enemigo reciclable en la pool
        var _enemy = this.enemyPool.getFirst(false);
        
        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = -16;

        if(!_enemy)
        {//Que no? Lo creo
            console.log('creando enemigo');
            //_enemy = new bulletPrefab(this,this.nave.x,this.nave.body.top,'bullet');
            //_enemy = this.add.sprite(posX,posY,'enemy');
            _enemy = new enemyPrefab(this,posX,posY,'enemy');
            this.enemyPool.add(_enemy);
            //_enemy.anims.play('enemy_idle');
        }else
        {//Que si? Lo reciclo
            console.log('reciclando enemigo');
            //_enemy.body.reset(posX,posY);
            //_enemy.active = true;
            //_enemy.health = gamePrefs.MAX_HEALTH_ENEMY;
            _enemy.reset(posX,posY);
        }
        //Hago cosas con el enemigo
        //Dar velocidad
        _enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);

        var rnd = Phaser.Math.Between(2,6);
        _enemy.shootingTimer = this.time.addEvent
        ({
            delay:rnd*1000,
            callback:this.createEnemyBullet,
            args:[_enemy],
            callbackScope:this,
            repeat:-1  //loop:true
        });        
    }

    createEnemyBullet(_enemy)
    {
        //Mirar si hay alguna bala reciclable en la pool
        var _bullet = this.enemyBulletPool.getFirst(false);
        
        if(!_bullet)
        {//Que no? La creo
            console.log('creando bala');
            _bullet = new bulletPrefab(this,_enemy.x,_enemy.body.bottom,'enemy_bullet');
            this.enemyBulletPool.add(_bullet);
        }else
        {//Que si? La reciclo
            console.log('reciclando bala');
            _bullet.body.reset(_enemy.x,_enemy.body.bottom);
            _bullet.active = true;
        }
        //Hago cosas con la bala
        //Dar velocidad
        _bullet.body.setVelocityY(gamePrefs.ENEMY_BULLET_SPEED);
        //Ejecuta sonido
        this.enemy_shoot.play();
    }

    update()
    { //Actualiza whatever  
        this.bg_back.tilePositionY -=.25; 
        this.bg_frontal.tilePositionY -=1;
        
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x -= gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            this.nave.anims.play('left',true);
        }else
        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.nave.body.velocity.x += gamePrefs.NAVE_SPEED;
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            this.nave.anims.play('right',true);
        }
        else
        {
            this.nave.anims.play('idle',true);
            //this.nave.body.velocity.x = 0;
        }
        /*
        if(this.cursores.space.isDown)//no me vale, balas infinitas mientras pulso
        if(this.cursores.space.isUp)//no me vale, balas infinitas mientras no pulso
        {
            this.createBullet();
        }
        */
    }
}