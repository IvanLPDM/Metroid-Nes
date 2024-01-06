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


        this.cameras.main.setBackgroundColor("0"); 
        this.load.setPath('assets/img');
        this.load.image('samus','/sprites/samus_idle.png');
        this.load.image('bullet','/sprites/bullet.png');
        this.load.image('samus','image.png');
        
        

        
        this.load.setPath('assets/img/sprites');
        this.load.spritesheet('samus_idle','samus_idle.png',{frameWidth:20,frameHeight:32});
        this.load.spritesheet('samus_walk','samus_walk.png',{frameWidth:22,frameHeight:32});
        this.load.spritesheet('samus_jump','samus_jump.png',{frameWidth:18,frameHeight:25});
        this.load.spritesheet('ball_transform','ball_transform.png',{frameWidth:33,frameHeight:24});
        this.load.spritesheet('ball_walk','ball_walk1.png',{frameWidth:17,frameHeight:32});
        this.load.spritesheet('door','door_anim_reves.png',{frameWidth:17,frameHeight:48});

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

        //var hasPowerUp = false;

        this.map = this.add.tilemap('metroidplatforms');
        
        this.map.addTilesetImage('walls_tileset1');
        //this.map.addTilesetImage('walls_tileset2');

        this.walls = this.map.createLayer('plataformas','walls_tileset1');
        this.map.setCollisionByExclusion(-1,true,true,'plataformas');


        this.bullet = this.physics.add.sprite(config.width/2,config.height,'bullet').setScale(1);

        //this.map.createLayer('capa de patrones 1', tileset);

        this.player = this.physics.add.sprite(2100,1960 - 140,'samus_idle');
        //this.player = new playerPrefab(config.width/2,config.height/2,'samus_idle');
        this.player.setCollideWorldBounds(true);

        this.powerup = this.physics.add.sprite(137,1960 - 90,'powerup');
        this.powerup.body.setAllowGravity(false);

        this.energyUI = this.add.sprite(130,30,'Energy')
        .setOrigin(1,0)
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
        
        this.spiky1 = new spikyPrefab(this,920/2 + 20,1960 - 140,'spiky1').setOrigin(0,1);
        this.spiky2 = new spikyPinkPrefab(this,920/2 + 60,1960 - 140,'spiky2').setOrigin(0,1);
        this.bean = new beanPrefab(this,920/2 + 300,1960 - 140 + 40, 'bean1');
        //this.spiky1.setCollideWorldBounds(true);
        this.bat = new batPrefab(this,920/2 + 40, 1960 - 50,'bat')

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
        this.cubeDoor2 = this.physics.add.sprite(1215,1960 - 135,'portalGame');
        this.cubeDoor2.body.setAllowGravity(false);
        this.cubeDoor2.body.setImmovable(true);
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

        var offset = 240;
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

        
        

        //Disparar
        this.input.keyboard.on('keydown-D', function (event) {
            this.ShootSoundA.play();
            this.createBullet(); 
        }, this); 

        this.loadPools();

        this.loadAnimations();


        this.door = this.physics.add.sprite(960/2 + 440,1960 - 135,'door');
        this.door.body.setAllowGravity(false);
        this.door.body.setImmovable(true);

        this.cubeDoor = this.physics.add.sprite(960/2 + 464,1960 - 135,'portalGame');
        this.cubeDoor.body.setAllowGravity(false);
        this.cubeDoor.body.setImmovable(true);


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

        this.physics.add.collider(this.spiky2, this.platform);
        this.physics.add.collider(this.spiky2, this.ground);
        this.physics.add.collider(this.spiky2, this.ceiling);

        this.physics.add.collider(this.bat, this.platform);
        this.physics.add.collider(this.bat, this.ground);
        this.physics.add.collider(this.bat, this.ceiling);


        
        //Collisions
        //this.physics.add.collider(this.player, this.spiky1,this.DamageSamus,null,this);

        this.physics.add.overlap(this.player, this.cubeDoor,this.ChangeScene,null,this);

        this.physics.add.overlap(this.bulletPool, this.door,this.OpenDoor,null,this);

        this.physics.add.overlap(this.player, this.spiky1,this.DamageSamus,null,this);

        this.physics.add.overlap(this.player, this.bean,this.DamageSamus,null,this);
        

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

        this.GameplayTheme.play();
    }

    ChangeScene()
    {
        const camX = this.cameras.main.scrollX;
        const camY = this.cameras.main.scrollY;

        const destinoX = camX - 940;
        const destinoY = camY;

        // Crear un objeto tween para desplazar la cámara
        this.tweens.add({
            targets: this.cameras.main,
            x: destinoX,
            y: destinoY,
            duration: 6000,
            ease: 'Power2',
            onComplete: function () {
                console.log('Animación de desplazamiento hacia la derecha completada.');
            }
        });
    }

    OpenDoor()
    {
        this.door.anims.play('OpenDoor',true);
        this.time.delayedCall(500, this.destruirPuerta, [], this);
        
    }

    destruirPuerta()
    {
        this.door.destroy();
    }

    GetPowerUp(powerup, player){

        //hasPowerUp = true;
        player.haspowerup = true;
        powerup.x = -10;
    }

    DamageSamus(player,spiky1){

        player.health -= 10;
        
        if(player.health <= 0)
        this.scene.start('loseScene');
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
    }
    
    update()
    {
        this.powerup.anims.play('powerup_anim',true);

        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.player.setVelocityX(-gamePrefs.Player_SPEED);
            this.player.setFlipX(true);
            if(this.player.body.onFloor() && this.player.powerupon == false){
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
            if(this.player.body.onFloor() && this.player.powerupon == false){
            this.player.anims.play('walk',true);
            }
            //this.nave.body.setVelocityX(gamePrefs.NAVE_SPEED);
            //this.nave.anims.play('right',true);
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

}