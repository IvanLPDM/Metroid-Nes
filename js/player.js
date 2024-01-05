class playerPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.health = 100;
        this.nivel=_scene;
        this.dead = false;
        this.haspowerup = false;
        this.powerupon = false;
        this.lookingLeft = false;
        this.lookingRight = false;
                        
    }

    hitHero(_player,_enemy)
    {
        this.player.health--;

        if(this.player.health <= 0)
        {
            this.scene.start('loseScene');
            this.player.body.reset(65,100);
        }

        this.scene.cameras.main.shake(500,0.05);
        this.scene.cameras.main.flash(250,255,0,0);    
        
    }

    preUpdate(time,delta)
    {        
        super.preUpdate(time, delta); 
        
    }
}