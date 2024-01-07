class gamePlay extends Phaser.Scene
{
    constructor()
    {
        super({key:'gamePlay'});
    }

    preload()
    {
        //Sounds
        this.load.audio('GamePlaySample', 'assets/sounds/1-03 Brinstar (Mono).mp3');
        this.load.audio('HitSound', 'assets/sounds/Hit.wav');
        this.load.audio('DeadSound', 'assets/sounds/Dead.wav');
        this.load.audio('ShootSound', 'assets/sounds/Disparo.wav');
        this.load.audio('PickPotionSound', 'assets/sounds/PickPotion.wav');
        this.load.audio('HitEnemySound', 'assets/sounds/HitEnemy.wav');
        this.load.audio('JumpSound', 'assets/sounds/Jump.wav');
        this.load.audio('RespawnSound', 'assets/sounds/1-02 Samus Aran Fanfare (Mono).mp3');
        


        this.cameras.main.setBackgroundColor("0"); 
        this.load.setPath('assets/img');
        this.load.image('samus','/sprites/samus_idle.png');
        this.load.image('bullet','/sprites/bullet.png');
        this.load.image('samus','image.png');
        
        

        
        this.load.setPath('assets/img/sprites');
        this.load.spritesheet('samus_idle','samus_idle.png',{frameWidth:20,frameHeight:32});
        this.load.spritesheet('samus_walk','samus_walk.png',{frameWidth:22,frameHeight:32});
        this.load.spritesheet('samus_jump','samus_jump.png',{frameWidth:18,frameHeight:25});
        this.load.spritesheet('samus_aim', 'samus_walk_aim.png',{frameWidth: 28, frameHeight: 31});
        this.load.spritesheet('samus_aim_up', 'samus_walk_aim_up.png',{frameWidth: 21, frameHeight: 38});
        this.load.spritesheet('ball_transform','ball_transform.png',{frameWidth:33,frameHeight:24});
        this.load.spritesheet('ball_walk','ball_walk1.png',{frameWidth:17,frameHeight:32});
        this.load.spritesheet('door','door_anim_reves.png',{frameWidth:17,frameHeight:48});
        this.load.spritesheet('reciveDamage','samus_damage.png',{frameWidth:20,frameHeight:32});
        this.load.spritesheet('respawn','Respawn.png',{frameWidth:16,frameHeight:32});

        this.load.spritesheet('powerup','powerup.png',{frameWidth:14,frameHeight:13});

        //ui
        this.load.image('Energy','Energy.png');

        this.load.image('plataforma','platform.png');
        this.load.image('ground','ground.png');
        this.load.image('potion','heal_drop.png');
        this.load.image('ceiling','ceiling.png');
        this.load.image('ceiling1','ceiling1.png');
        this.load.image('ceiling2','ceiling2.png');
        this.load.image('ceiling3','ceiling3.png');
        this.load.image('vertical_platform','vertical_platform.png');
        this.load.image('big_platform','big_platform.png');
        this.load.image('left_bound','left_bound.png');
        this.load.image('powerup_platform','powerup_platform.png');
        this.load.image('door_platform','door_platform.png');
        this.load.image('horizontal_platform','horizontal_platform.png');
        this.load.image('short_horizontal_platform','short_horizontal_platform.png');
        this.load.image('portalGame','portal.png');
        this.load.image('obstacle','obstacle.png');
        this.load.image('room4_wall','room4_wall.png');
        this.load.image('room4_platforms','room4_platforms.png');

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
        var offset = 240;
        //var hasPowerUp = false;

        this.map = this.add.tilemap('metroidplatforms');
        
        this.map.addTilesetImage('walls_tileset1');
        //this.map.addTilesetImage('walls_tileset2');

        this.walls = this.map.createLayer('plataformas','walls_tileset1');
        this.map.setCollisionByExclusion(-1,true,true,'plataformas');


        this.bullet = this.physics.add.sprite(config.width/2,config.height,'bullet').setScale(1);

        //this.map.createLayer('capa de patrones 1', tileset);

        this.player = this.physics.add.sprite(960/2 - 25,1960 - 64,'samus_idle');//sprite(2100,1960 - 140,'samus_idle');////////////
        //this.player = new playerPrefab(config.width/2,config.height/2,'samus_idle');
        this.player.setCollideWorldBounds(true);

        this.powerup = this.physics.add.sprite(137,1960 - 90,'powerup');
        this.powerup.body.setAllowGravity(false);

        this.energyUI = this.add.sprite(130,30,'Energy')
        .setOrigin(1,1900)
        .setScale(2)
        .setDepth(1);

        this.energy = 100;
        this.energyText = this.add.text
        (
            160,
            30,
            this.energy,
            {
                fontFamily:'Arial',
                fill:'#FFFFFF',
                fontSize:17
            }
        ).setOrigin(1,0)
        .setDepth(1);


        //this.spiky1 = this.physics.add.sprite(config.width/2 + 20,config.height/2,'spiky1');
        
        
        //this.spiky1.setCollideWorldBounds(true);

        this.platform = this.physics.add.sprite(960/2 + 140,1960 - 20,'plataforma');
//tilemap
        this.platform = this.physics.add.sprite(960/2 - 24,1960 - 40,'plataforma');
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);
        this.ground = this.physics.add.sprite(0,1960,'ground').setOrigin(0,1);
        this.ground.body.setAllowGravity(false);
        this.ground.body.setImmovable(true);
        this.ceiling1 = this.physics.add.sprite(0,1960-240,'ceiling1').setOrigin(0,0);
        this.ceiling1.body.setAllowGravity(false);
        this.ceiling1.body.setImmovable(true);
        this.ceiling2 = this.physics.add.sprite(960/2 - 66,1960-240,'ceiling2').setOrigin(0,0);
        this.ceiling2.body.setAllowGravity(false);
        this.ceiling2.body.setImmovable(true);
        this.platform2 = this.physics.add.sprite(960/2 - 80,1960 - 80,'vertical_platform').setOrigin(0,1);
        this.platform2.body.setAllowGravity(false);
        this.platform2.body.setImmovable(true);
        this.platform3 = this.physics.add.sprite(960/2,1960 - 80,'vertical_platform').setOrigin(0,1);
        this.platform3.body.setAllowGravity(false);
        this.platform3.body.setImmovable(true);
        this.platform3.flipX = !this.platform3.flipX;
        this.platform4 = this.physics.add.sprite(960/2 - 250,1960 - 48,'big_platform').setOrigin(0,1);
        this.platform4.body.setAllowGravity(false);
        this.platform4.body.setImmovable(true);
        this.platform5 = this.physics.add.sprite(960/2 - 266,1960 - 80,'big_platform').setOrigin(0,1);
        this.platform5.body.setAllowGravity(false);
        this.platform5.body.setImmovable(true);
        this.platform6 = this.physics.add.sprite(960/2 - 282,1960 - 112,'big_platform').setOrigin(0,1);
        this.platform6.body.setAllowGravity(false);
        this.platform6.body.setImmovable(true);
        this.bound = this.physics.add.sprite(0,1960,'left_bound').setOrigin(0,1);
        this.bound.body.setAllowGravity(false);
        this.bound.body.setImmovable(true);
        this.powerupplatform = this.physics.add.sprite(128,1960 - 32,'powerup_platform').setOrigin(0,1);
        this.powerupplatform.body.setAllowGravity(false);
        this.powerupplatform.body.setImmovable(true);
        this.doorplat = this.physics.add.sprite(960,1960 - 32,'door_platform').setOrigin(1,1);
        this.doorplat.body.setAllowGravity(false);
        this.doorplat.body.setImmovable(true);
        this.doorplat1 = this.physics.add.sprite(960,1960-240,'door_platform').setOrigin(1,0);
        this.doorplat1.body.setAllowGravity(false);
        this.doorplat1.body.setImmovable(true);
        this.platform7 = this.physics.add.sprite(960 - 32,1960 - 96,'horizontal_platform').setOrigin(1,1);
        this.platform7.body.setAllowGravity(false);
        this.platform7.body.setImmovable(true);

        this.spiky1 = new spikyPrefab(this,920/2 + 20,1960 - 140,'spiky1').setOrigin(0,1);
        this.bat1 = new batPrefab(this,920/2 + 170, 1960 - 200,'bat');
        this.bat2 = new batPrefab(this,920/2 + 270, 1960 - 200,'bat');
        this.bat3 = new batPrefab(this,920/2 + 340, 1960 - 200,'bat');

        //Room2
        this.platform8 = this.physics.add.sprite(960,1960 - 48,'big_platform').setOrigin(0,1);
        this.platform8.body.setAllowGravity(false);
        this.platform8.body.setImmovable(true);
        this.platform9 = this.physics.add.sprite(1080,1960 - 135,'plataforma');
        this.platform9.body.setAllowGravity(false);
        this.platform9.body.setImmovable(true);
        this.platform10 = this.physics.add.sprite(1135,1960 - 48,'big_platform').setOrigin(0,1);
        this.platform10.body.setAllowGravity(false);
        this.platform10.body.setImmovable(true);
        this.platform11 = this.physics.add.sprite(1080,1960 - 100,'plataforma');
        this.platform11.body.setAllowGravity(false);
        this.platform11.body.setImmovable(true);
        this.ceiling3 = this.physics.add.sprite(960,1960 - 240,'ceiling3').setOrigin(0,0);
        this.ceiling3.body.setAllowGravity(false);
        this.ceiling3.body.setImmovable(true);
        
        this.doorplat2 = this.physics.add.sprite(1230,1960 - 240,'door_platform').setOrigin(1,0);
        this.doorplat2.body.setAllowGravity(false);
        this.doorplat2.body.setImmovable(true);
        this.doorplat3 = this.physics.add.sprite(1230,1960 - 110,'door_platform').setOrigin(1,0);
        this.doorplat3.body.setAllowGravity(false);
        this.doorplat3.body.setImmovable(true);

        //Room3
        this.ground1 = this.physics.add.sprite(1200,1960,'ground').setOrigin(0,1);
        this.ground1.body.setAllowGravity(false);
        this.ground1.body.setImmovable(true);
        this.ceiling4 = this.physics.add.sprite(1200,1960-240,'ceiling1').setOrigin(0,0);
        this.ceiling4.body.setAllowGravity(false);
        this.ceiling4.body.setImmovable(true);
        this.ceiling5 = this.physics.add.sprite(1725,1960-240,'ceiling3').setOrigin(0,0);
        this.ceiling5.body.setAllowGravity(false);
        this.ceiling5.body.setImmovable(true);
        this.obstacle = this.physics.add.sprite(1600,1960-240,'obstacle').setOrigin(0,0);
        this.obstacle.body.setAllowGravity(false);
        this.obstacle.body.setImmovable(true);
        this.doorplat4 = this.physics.add.sprite(2000,1960 - 32,'door_platform').setOrigin(1,1);
        this.doorplat4.body.setAllowGravity(false);
        this.doorplat4.body.setImmovable(true);
        this.doorplat5 = this.physics.add.sprite(2000,1960-240,'door_platform').setOrigin(1,0);
        this.doorplat5.body.setAllowGravity(false);
        this.doorplat5.body.setImmovable(true);
        this.platform12 = this.physics.add.sprite(2000,1960 - 96,'horizontal_platform').setOrigin(1,1);
        this.platform12.body.setAllowGravity(false);
        this.platform12.body.setImmovable(true);
        this.cubeDoor3 = this.physics.add.sprite(2000,1960 - 135,'portalGame');
        this.cubeDoor3.body.setAllowGravity(false);
        this.cubeDoor3.body.setImmovable(true);

        this.spiky2 = new spikyPrefab(this,1250,1960 - 140,'spiky1').setOrigin(0,1);
        this.spiky3 = new spikyPrefab(this,1350 + 20,1960 - 140,'spiky1').setOrigin(0,1);
        this.spiky4 = new spikyPrefab(this,1600 + 20,1960 - 140,'spiky1').setOrigin(0,1);
        this.spiky5 = new spikyPrefab(this,1700 + 20,1960 - 140,'spiky1').setOrigin(0,1);
        this.spiky6 = new spikyPrefab(this,1800 + 20,1960 - 140,'spiky1').setOrigin(0,1);

        this.bat4 = new batPrefab(this,1300, 1960 - 200,'bat');
        this.bat5 = new batPrefab(this,1400, 1960 - 200,'bat');
        this.bat6 = new batPrefab(this,1470, 1960 - 200,'bat');
        this.bat7 = new batPrefab(this,1500, 1960 - 200,'bat');
        this.bat8 = new batPrefab(this,1550, 1960 - 200,'bat');
        this.bat9 = new batPrefab(this,1590, 1960 - 200,'bat');

        //room4
        this.room4wall1 = this.physics.add.sprite(1985,1960 - 160,'room4_wall').setOrigin(0,1);
        this.room4wall1.body.setAllowGravity(false);
        this.room4wall1.body.setImmovable(true);
        this.room4wall2 = this.physics.add.sprite(2225,1960,'room4_wall').setOrigin(0,1);
        this.room4wall2.body.setAllowGravity(false);
        this.room4wall2.body.setImmovable(true);
        this.ground2 = this.physics.add.sprite(1600,1960,'ground').setOrigin(0,1);
        this.ground2.body.setAllowGravity(false);
        this.ground2.body.setImmovable(true);

        this.finish = this.physics.add.sprite(2100,1960 - 1340,'powerup').setOrigin(0,1);
        this.finish.body.setAllowGravity(false);
        this.finish.body.setImmovable(true);

        this.bean = new beanPrefab(this,2200,1960 - 175, 'bean1');
        this.bean1 = new beanPrefab(this,2100,1960 - 250, 'bean1');
        this.bean2 = new beanPrefab(this,2050,1960 - 325, 'bean1');
        this.bean3 = new beanPrefab(this,2140,1960 - 400, 'bean1');
        this.bean4 = new beanPrefab(this,2090,1960 - 480, 'bean1');
        this.bean5 = new beanPrefab(this,2165,1960 - 570, 'bean1');
        this.bean6 = new beanPrefab(this,2035,1960 - 660, 'bean1');

        this.bean7 = new beanPrefab(this,2200,1960 - 760, 'bean1');
        this.bean8 = new beanPrefab(this,2200,1960 - 860, 'bean1');
        this.bean9 = new beanPrefab(this,2200,1960 - 960, 'bean1');
        this.bean10 = new beanPrefab(this,2200,1960 - 1080, 'bean1');
        this.bean11 = new beanPrefab(this,2200,1960 - 1160, 'bean1');
        this.bean12 = new beanPrefab(this,2200,1960 - 1260, 'bean1');
        this.bean13 = new beanPrefab(this,2200,1960 - 1360, 'bean1');

        this.spikyp1 = new spikyPinkPrefab(this,2085,1960 - 170,'spiky2').setOrigin(0,1);
        this.room4platform1 = this.physics.add.sprite(2080,1960 - 150,'horizontal_platform').setOrigin(0,1);
        this.room4platform1.body.setAllowGravity(false);
        this.room4platform1.body.setImmovable(true);
        this.room4platform26 = this.physics.add.sprite(2000,1960 - 96,'horizontal_platform').setOrigin(0,1);
        this.room4platform26.body.setAllowGravity(false);
        this.room4platform26.body.setImmovable(true);
        this.room4platform2 = this.physics.add.sprite(2030,1960 - 220,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform2.body.setAllowGravity(false);
        this.room4platform2.body.setImmovable(true);
        this.room4platform3 = this.physics.add.sprite(2150,1960 - 200,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform3.body.setAllowGravity(false);
        this.room4platform3.body.setImmovable(true);
        this.room4platform4 = this.physics.add.sprite(2100,1960 - 280,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform4.body.setAllowGravity(false);
        this.room4platform4.body.setImmovable(true);
        this.room4platform5 = this.physics.add.sprite(2000,1960 - 320,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform5.body.setAllowGravity(false);
        this.room4platform5.body.setImmovable(true);

        
        this.spikyp2 = new spikyPinkPrefab(this,2085,1960 - 410,'spiky2').setOrigin(0,1);
        this.room4platform6 = this.physics.add.sprite(2080,1960 - 390,'horizontal_platform').setOrigin(0,1);
        this.room4platform6.body.setAllowGravity(false);
        this.room4platform6.body.setImmovable(true);
        this.room4platform7 = this.physics.add.sprite(2030,1960 - 460,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform7.body.setAllowGravity(false);
        this.room4platform7.body.setImmovable(true);
        this.room4platform8 = this.physics.add.sprite(2150,1960 - 440,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform8.body.setAllowGravity(false);
        this.room4platform8.body.setImmovable(true);
        this.room4platform9 = this.physics.add.sprite(2100,1960 - 520,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform9.body.setAllowGravity(false);
        this.room4platform9.body.setImmovable(true);
        this.room4platform10 = this.physics.add.sprite(2000,1960 - 560,'short_horizontal_platform').setOrigin(0,1);
        this.room4platform10.body.setAllowGravity(false);
        this.room4platform10.body.setImmovable(true);

        this.spikyp3 = new spikyPinkPrefab(this,2085,1960 - 650,'spiky2').setOrigin(0,1);
        this.room4platform11 = this.physics.add.sprite(2080,1960 - (390 + offset),'horizontal_platform').setOrigin(0,1);
        this.room4platform11.body.setAllowGravity(false);
        this.room4platform11.body.setImmovable(true);
        this.room4platform12 = this.physics.add.sprite(2030,1960 - (460 + offset),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform12.body.setAllowGravity(false);
        this.room4platform12.body.setImmovable(true);
        this.room4platform13 = this.physics.add.sprite(2150,1960 - (440 + offset),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform13.body.setAllowGravity(false);
        this.room4platform13.body.setImmovable(true);
        this.room4platform14 = this.physics.add.sprite(2100,1960 - (520 + offset),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform14.body.setAllowGravity(false);
        this.room4platform14.body.setImmovable(true);
        this.room4platform15 = this.physics.add.sprite(2000,1960 - (560 + offset),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform15.body.setAllowGravity(false);
        this.room4platform15.body.setImmovable(true);

        this.spikyp4 = new spikyPinkPrefab(this,2085,1960 - 1500,'spiky2').setOrigin(0,1);
        this.room4platform16 = this.physics.add.sprite(2080,1960 - (390 + (offset * 2)),'horizontal_platform').setOrigin(0,1);
        this.room4platform16.body.setAllowGravity(false);
        this.room4platform16.body.setImmovable(true);
        this.room4platform17 = this.physics.add.sprite(2030,1960 - (460 + (offset * 2)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform17.body.setAllowGravity(false);
        this.room4platform17.body.setImmovable(true);
        this.room4platform18 = this.physics.add.sprite(2150,1960 - (440 + (offset * 2)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform18.body.setAllowGravity(false);
        this.room4platform18.body.setImmovable(true);
        this.room4platform19 = this.physics.add.sprite(2100,1960 - (520 + (offset * 2)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform19.body.setAllowGravity(false);
        this.room4platform19.body.setImmovable(true);
        this.room4platform20 = this.physics.add.sprite(2000,1960 - (560 + (offset * 2)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform20.body.setAllowGravity(false);
        this.room4platform20.body.setImmovable(true);

        this.spikyp5 = new spikyPinkPrefab(this,2085,1960 - 1500,'spiky2').setOrigin(0,1);
        this.room4platform21 = this.physics.add.sprite(2080,1960 - (390 + (offset * 3)),'horizontal_platform').setOrigin(0,1);
        this.room4platform21.body.setAllowGravity(false);
        this.room4platform21.body.setImmovable(true);
        this.room4platform22 = this.physics.add.sprite(2030,1960 - (460 + (offset * 3)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform22.body.setAllowGravity(false);
        this.room4platform22.body.setImmovable(true);
        this.room4platform23 = this.physics.add.sprite(2150,1960 - (440 + (offset * 3)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform23.body.setAllowGravity(false);
        this.room4platform23.body.setImmovable(true);
        this.room4platform24 = this.physics.add.sprite(2100,1960 - (520 + (offset * 3)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform24.body.setAllowGravity(false);
        this.room4platform24.body.setImmovable(true);
        this.room4platform25 = this.physics.add.sprite(2000,1960 - (560 + (offset * 3)),'short_horizontal_platform').setOrigin(0,1);
        this.room4platform25.body.setAllowGravity(false);
        this.room4platform25.body.setImmovable(true);


        this.cursores = this.input.keyboard.createCursorKeys();

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Camara
        this.cameras.main.setZoom(9);
        this.cameras.main.startFollow(this.player);
        

        //Disparar
        this.health = 100;
        this.shooting = false;
        this.lookingLeft = false;
        this.lookingRight = false;
        this.lookingUp = false;
        this.input.keyboard.on('keydown-D', function (event) {
            this.ShootSoundA.play();
            this.createBullet(); 
        }, this); 

        this.loadPools();

        this.loadAnimations();

        //ROOM1
        this.door = this.physics.add.sprite(960/2 + 440,1960 - 135,'door');
        this.door.body.setAllowGravity(false);
        this.door.body.setImmovable(true);

        this.cubeDoor = this.physics.add.sprite(960/2 + 464,1960 - 135,'portalGame');
        this.cubeDoor.body.setAllowGravity(false);
        this.cubeDoor.body.setImmovable(true);
        //ROOM2
        this.door2 = this.physics.add.sprite(960/2 + 712,1960 - 135,'door');
        this.door2.body.setAllowGravity(false);
        this.door2.body.setImmovable(true);

        this.cubeDoor1 = this.physics.add.sprite(960/2 + 736,1960 - 135,'portalGame');
        this.cubeDoor1.body.setAllowGravity(false);
        this.cubeDoor1.body.setImmovable(true);
        //ROOM3
        this.door3 = this.physics.add.sprite(960/2 + 1482,1960 - 135,'door');
        this.door3.body.setAllowGravity(false);
        this.door3.body.setImmovable(true);

        this.cubeDoor2 = this.physics.add.sprite(960/2 + 1506,1960 - 135,'portalGame');
        this.cubeDoor2.body.setAllowGravity(false);
        this.cubeDoor2.body.setImmovable(true);

        this.physics.add.overlap(this.player, this.finish,this.FinishGame,null,this);


        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);
        this.physics.add.collider(this.player, this.platform4);
        this.physics.add.collider(this.player, this.platform5);
        this.physics.add.collider(this.player, this.platform6);
        this.physics.add.collider(this.player, this.platform7);
        this.physics.add.collider(this.player, this.platform8);
        this.physics.add.collider(this.player, this.platform9);
        this.physics.add.collider(this.player, this.platform10);
        this.physics.add.collider(this.player, this.platform11);
        this.physics.add.collider(this.player, this.platform12);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.obstacle);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.ground1);
        this.physics.add.collider(this.player, this.bound);
        this.physics.add.collider(this.player, this.ceiling1);
        this.physics.add.collider(this.player, this.ceiling2);
        this.physics.add.collider(this.player, this.ceiling3);
        this.physics.add.collider(this.player, this.ceiling4);
        this.physics.add.collider(this.player, this.ceiling5);
        this.physics.add.collider(this.player, this.platform4);
        this.physics.add.collider(this.player, this.powerupplatform);
        this.physics.add.collider(this.player, this.platform7);
        this.physics.add.collider(this.player, this.doorplat);
        this.physics.add.collider(this.player, this.doorplat1);
        this.physics.add.collider(this.player, this.doorplat2);
        this.physics.add.collider(this.player, this.doorplat3);
        this.physics.add.collider(this.player, this.doorplat4);
        this.physics.add.collider(this.player, this.doorplat5);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.player, this.door2);
        this.physics.add.collider(this.player, this.door3);

        this.physics.add.collider(this.player, this.room4platform1);
        this.physics.add.collider(this.player, this.room4platform2);
        this.physics.add.collider(this.player, this.room4platform3);
        this.physics.add.collider(this.player, this.room4platform4);
        this.physics.add.collider(this.player, this.room4platform5);
        this.physics.add.collider(this.player, this.room4platform6);
        this.physics.add.collider(this.player, this.room4platform7);
        this.physics.add.collider(this.player, this.room4platform8);
        this.physics.add.collider(this.player, this.room4platform9);
        this.physics.add.collider(this.player, this.room4platform10);
        this.physics.add.collider(this.player, this.room4platform11);
        this.physics.add.collider(this.player, this.room4platform12);
        this.physics.add.collider(this.player, this.room4platform13);
        this.physics.add.collider(this.player, this.room4platform14);
        this.physics.add.collider(this.player, this.room4platform15);
        this.physics.add.collider(this.player, this.room4platform16);
        this.physics.add.collider(this.player, this.room4platform17);
        this.physics.add.collider(this.player, this.room4platform18);
        this.physics.add.collider(this.player, this.room4platform19);
        this.physics.add.collider(this.player, this.room4platform20);
        this.physics.add.collider(this.player, this.room4platform21);
        this.physics.add.collider(this.player, this.room4platform22);
        this.physics.add.collider(this.player, this.room4platform23);
        this.physics.add.collider(this.player, this.room4platform24);
        this.physics.add.collider(this.player, this.room4platform25);
        this.physics.add.collider(this.player, this.room4platform26);
        this.physics.add.collider(this.player, this.room4wall1);
        this.physics.add.collider(this.player, this.room4wall2);
        

        this.physics.add.collider(this.player, this.potionPool, this.HealPlayer, null, this);
        this.physics.add.collider(this.spiky1, this.platform);
        this.physics.add.collider(this.spiky1, this.ground);
        this.physics.add.collider(this.spiky1, this.ceiling);

        this.physics.add.collider(this.spiky2, this.ground2);
        this.physics.add.collider(this.spiky3, this.ground2);
        this.physics.add.collider(this.spiky4, this.ground2);
        this.physics.add.collider(this.spiky5, this.ground2);
        this.physics.add.collider(this.spiky6, this.ground2);
        this.physics.add.collider(this.spiky2, this.ground1);
        this.physics.add.collider(this.spiky3, this.ground1);
        this.physics.add.collider(this.spiky4, this.ground1);
        this.physics.add.collider(this.spiky5, this.ground1);
        this.physics.add.collider(this.spiky6, this.ground1);

        this.physics.add.collider(this.spikyp1, this.room4platform1);
        this.physics.add.collider(this.spikyp2, this.room4platform6);
        this.physics.add.collider(this.spikyp3, this.room4platform11);
        this.physics.add.collider(this.spikyp4, this.room4platform16);
        this.physics.add.collider(this.spikyp5, this.room4platform21);

        this.physics.add.collider(this.spiky2, this.platform);
        this.physics.add.collider(this.spiky2, this.ground);
        this.physics.add.collider(this.spiky2, this.ceiling);

        this.physics.add.collider(this.bat1, this.ground);
        this.physics.add.collider(this.bat2, this.ground);
        this.physics.add.collider(this.bat3, this.ground);


        
        //Collisions

        this.physics.add.overlap(this.player, this.cubeDoor,this.ChangeScene,null,this);
        this.physics.add.overlap(this.player, this.cubeDoor1,this.ChangeScene_2_3,null,this);
        this.physics.add.overlap(this.player, this.cubeDoor2,this.ChangeScene_3_4,null,this);

        this.physics.add.overlap(this.bulletPool, this.door,this.OpenDoor,null,this);
        this.physics.add.overlap(this.bulletPool, this.door2,this.OpenDoor,null,this);
        this.physics.add.overlap(this.bulletPool, this.door3,this.OpenDoor,null,this);

        this.physics.add.overlap(this.player, this.spiky1,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spiky2,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spiky3,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spiky4,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spiky5,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spiky6,this.DamageSamus,null,this);

        this.physics.add.overlap(this.player, this.spikyp1,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spikyp2,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spikyp3,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spikyp4,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.spikyp5,this.DamageSamus,null,this);
        
        this.physics.add.overlap(this.player, this.bean,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean1,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean2,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean3,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean4,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean5,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean6,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean7,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean8,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean9,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean10,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean11,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean12,this.DamageSamus,null,this);
        this.physics.add.overlap(this.player, this.bean13,this.DamageSamus,null,this);

        this.physics.add.collider(this.spiky1, this.platform);

        this.physics.add.collider(this.bean, this.platform);
        this.physics.add.collider(this.bean, this.platform2);
        this.physics.add.collider(this.bean, this.platform3);
        this.physics.add.collider(this.bean, this.platform4);
        this.physics.add.collider(this.bean, this.platform5);
        this.physics.add.collider(this.bean, this.platform6);
        this.physics.add.collider(this.bean, this.ground);
        this.physics.add.collider(this.bean, this.bound);
        this.physics.add.collider(this.bean, this.ceiling1);
        this.physics.add.collider(this.bean, this.ceiling2);
        this.physics.add.collider(this.bean, this.platform4);
        this.physics.add.collider(this.bean, this.powerupplatform);
        this.physics.add.collider(this.bean, this.platform7);
        this.physics.add.collider(this.bean, this.doorplat);
        this.physics.add.collider(this.bean, this.doorplat1);
        this.physics.add.collider(this.bean, this.door);

        this.physics.add.overlap(this.bulletPool, this.bat,this.DamageEnemy,null,this);
        
        this.physics.add.collider(this.bulletPool, this.bat,this.DamageEnemy,null,this);

        this.physics.add.overlap(this.bulletPool, this.bean,this.DamageEnemy,null,this);
        
        this.physics.add.overlap(this.powerup,this.player,this.GetPowerUp,null,this);

        //Audios
        this.GameplayTheme = this.sound.add('GamePlaySample');
        this.HitSoundA = this.sound.add('HitSound');
        this.DeadSoundA = this.sound.add('DeadSound');
        this.ShootSoundA = this.sound.add('ShootSound');
        this.PickPotionSoundA = this.sound.add('PickPotionSound');
        this.HitEnemySoundA = this.sound.add('HitEnemySound');
        this.JumpSoundA = this.sound.add('JumpSound');
        this.RespawnSound = this.sound.add('RespawnSound');

        this.RespawnSound.play();
        this.levels = 1;
        this.canDamage = true;
        this.playMusic = false;

        this.animationOnGoing = true;
    }

    FinishGame()
    {
        this.GameplayTheme.stop();
        this.scene.start('WinScene');
    }

    ChangeScene()
    {
        this.levels = 2;
    }

    ChangeScene_2_3()
    {
        /*const camX = this.cameras.main.scrollX;
        const camY = this.cameras.main.scrollY;

        const destinoX = camX - 940;
        const destinoY = camY;

        // Crear un objeto tween para desplazar la cámara
        this.tweens.add({
            targets: this.cameras.main,
            x: destinoX,
            y: destinoY,
            duration: 2000,
            ease: 'Power2',
            onComplete: function () {
                console.log('Animación de desplazamiento hacia la derecha completada.');
            }
        });*/
        
        this.levels = 3;
        
    }

    ChangeScene_3_4()
    {
        /*const camX = this.cameras.main.scrollX;
        const camY = this.cameras.main.scrollY;

        const destinoX = camX - 940;
        const destinoY = camY;

        // Crear un objeto tween para desplazar la cámara
        this.tweens.add({
            targets: this.cameras.main,
            x: destinoX,
            y: destinoY,
            duration: 2000,
            ease: 'Power2',
            onComplete: function () {
                console.log('Animación de desplazamiento hacia la derecha completada.');
            }
        });*/
        
        this.levels = 4;
        
    }

    OpenDoor()
    {
        if(this.levels == 1)
        {
            this.door.anims.play('OpenDoor',true);
            this.time.delayedCall(500, this.destruirPuerta, [], this);
        }
        else if(this.levels == 2)
        {
            this.door2.anims.play('OpenDoor',true);
            this.time.delayedCall(500, this.destruirPuerta, [], this);
        }
        else if(this.levels == 3)
        {
            this.door3.anims.play('OpenDoor',true);
            this.time.delayedCall(500, this.destruirPuerta, [], this);
        }
        
    }

    destruirPuerta()
    {
        if(this.levels == 1)
        {
            this.door.destroy();
        }
        else if(this.levels == 2)
        {
            this.door2.destroy();
        }
        else if(this.levels == 3)
        {
            this.door3.destroy();
        }
        
    }

    GetPowerUp(powerup, player){

        //hasPowerUp = true;
        player.haspowerup = true;
        powerup.x = -10;
    }

    DamageSamus(player,spiky1){

        if(this.canDamage)
        {
            this.health -= 15;
            this.HitSoundA.play();
    
             // Aplica una fuerza de retroceso
            var retrocesoX = 200; 
            var retrocesoY = 200;   
    
            player.setVelocity(-retrocesoX, -retrocesoY);
    
            this.canDamage = false;
            this.playerDamageAnimation();
                
            if(this.health <= 0)
            {
                this.GameplayTheme.stop();
                this.scene.start('loseScene');
             }
        
                //this.scene.cameras.main.shake(500,0.05);
                //this.scene.cameras.main.flash(250,255,0,0);  
        }
        
    }

    playerDamageAnimation() {
        this.player.anims.play('ReciveDamageAnim',true);
    
        // Configura un temporizador para revertir la animación después de 3 segundos
        this.time.delayedCall(3000, this.stopDamage, [], this);
    }
    
    stopDamage() {
        this.canDamage = true;
    }

    

    HealPlayer(player, potion)
    {
        this.health += 20;
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
        this.shooting = true;
        var _bullet = this.bulletPool.getFirst(false);

        this.shootPositionX = this.player.x + 8;
        this.shootPositionY = this.player.y - 7;
        
        
        if(!_bullet)
        {//Que no? La creo
            if(this.cursores.left.isDown)
            {
                this.player.anims.play('ShootHorizontal',true);
            }
            else if(this.cursores.right.isDown)
            {
                this.player.anims.play('ShootHorizontal',true);
            }
            /*else if(this.cursores.up.isDown)
            {
                this.player.anims.play('ShootVertical',true);
            }*/
            
            if(this.lookingUp == true)
            {
                this.shootPositionX = this.player.x + 4;
                this.shootPositionY = this.player.y - 4;
                this.directionVelocityBulletX = 0;
                this.directionVelocityBulletY = -300;
            }
            else if(this.lookingLeft == true)
            {
                this.shootPositionX = this.player.x - 16;
                this.shootPositionY = this.player.y - 7;

                this.Initdirection = true;

                this.directionVelocityBulletX = -300;
                this.directionVelocityBulletY = 0;
            }
            else if(this.lookingRight == true)
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
            if(this.lookingLeft)
            {
                this.shootPositionX = this.player.x - 20;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.lookingRight)
            {
                this.shootPositionX = this.player.x + 20;
                this.shootPositionY = this.player.y - 10;
            }
            else if(this.lookingUp)
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
                key: 'spiky2_horizontal',
                frames:this.anims.generateFrameNumbers('spiky2', {start:0, end: 1}),
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
        this.anims.create(
            {
                key: 'ball_walk_anim',
                frames:this.anims.generateFrameNumbers('ball_walk', {start:0, end: 3}),
                frameRate: 10,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'powerup_anim',
                frames:this.anims.generateFrameNumbers('powerup', {start:0, end: 3}),
                frameRate: 10,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'OpenDoor',
                frames:this.anims.generateFrameNumbers('door', {start:1, end: 0}),
                frameRate: 1,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'ShootHorizontal',
                frames:this.anims.generateFrameNumbers('samus_aim', {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'ShootVertical',
                frames:this.anims.generateFrameNumbers('samus_aim_up', {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'ReciveDamageAnim',
                frames:this.anims.generateFrameNumbers('reciveDamage', {start:0, end: 1}),
                frameRate: 4,
                repeat: -1
            }
        );
        this.anims.create(
            {
                key: 'RespawnAnim',
                frames:this.anims.generateFrameNumbers('respawn', {start:3, end:0}),
                frameRate: 0.5,
                repeat: -1
            }
        );

        
    }
    
    update()
    {

        if(this.animationOnGoing)
        {
            this.player.anims.play('RespawnAnim', true);

            this.time.delayedCall(6800, () => {
                this.animationOnGoing = false;
            }, [], this);
        }
        else
        {
            if(this.playMusic == false)
            {
                this.GameplayTheme.play();
                this.playMusic = true;
            }
            this.powerup.anims.play('powerup_anim',true);
            this.finish.anims.play('powerup_anim', true);

        if (this.cursores.left.isUp) 
        {
            if(this.lookingLeft == true)
                this.shooting = false;
        } else if (this.cursores.right.isUp) 
        {
            if(this.lookingRight == true)
                this.shooting = false;
        }
        else if (this.cursores.up.isUp) 
        {
            if(this.lookingUp == true)
                this.shooting = false;
        }

        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.player.setVelocityX(-gamePrefs.Player_SPEED);
            this.player.setFlipX(true);
            if(this.player.body.onFloor() && this.player.powerupon == false && this.shooting == false){
                this.player.anims.play('walk',true);
            }
            this.lookingLeft = true;
            this.lookingRight = false;
            this.lookingUp = false;
            //this.nave.body.setVelocityX(-gamePrefs.NAVE_SPEED);
            //this.player.anims.play('left',true);
        }
        else if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.player.setVelocityX(gamePrefs.Player_SPEED);
            this.player.setFlipX(false);
            if(this.player.body.onFloor() && this.player.powerupon == false && this.shooting == false){
            this.player.anims.play('walk',true);
            }
            this.lookingRight = true;
            this.lookingLeft = false;
            this.lookingUp = false;
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            //this.nave.anims.play('right',true);
        }
        else if(this.cursores.up.isDown)
        {
            this.lookingLeft = false;
            this.lookingRight = false;
            this.lookingUp = true;
        }
        else{

            this.player.setVelocityX(0)
            if(this.player.body.onFloor()){
                this.player.anims.play('idle',true);
                this.player.body.setSize(20,32);
            }
        }
        
        if(this.cursores.space.isDown && !this.isjumping && this.player.body.onFloor())
        {
            this.JumpSoundA.play();
            this.player.setVelocityY(-265);
            this.player.anims.play('jump',true);
            this.isjumping = true;
            
        }

        if(this.player.body.onFloor()){
            this.isjumping = false;
        }

        //this.spiky1.anims.play('spiky_horizontal',true);

        if(this.cursores.down.isDown && this.player.haspowerup){
            
            if(this.player.body.onFloor()){
                
                this.player.anims.play('ball_walk_anim',true);
                this.player.body.setSize(20,13);
                this.player.powerupon = true;
            }
            
            //this.player.body.setSize(20,32,0,32);
        }
        if(this.cursores.down.isUp){
            
            this.player.powerupon = false;
            //this.player.body.setSize(20,32,0,32);
        }
        }

        if(this.levels == 1)
        {
            this.cameras.main.setBounds(0,1600, 950, 375);
        }
        else if(this.levels == 2)
        {
            this.cameras.main.setBounds(950,1600, 200, 375);
        }
        else if(this.levels == 3)
        {
            this.cameras.main.setBounds(1200,1600, 780, 375);
        }
        else if(this.levels == 4)
        {
            this.cameras.main.setBounds(1980,0, 200, config.height);
        }   
        else if(this.levels == 5)
        {
            this.cameras.main.setBounds(0,0, config.width, config.height);
        }   
        
        
    }

}