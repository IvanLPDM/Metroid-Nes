class enemyPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.anims.play(_spriteTag,true);
        this.scene = _scene;
        this.enemy = this;
        this.direccion = 1;
        this.body.setCollideWorldBounds(true);
        //this.setColliders();
    }

    setColliders()
    {
        this.scene.physics.add.overlap
        (
            this.scene.player,
            this.enemy,
            this.scene.player.hitHero,
            null,
            this.scene.player
        );

        this.scene.physics.add.collider
        (
            this,
            this.scene.platform
            //this.scene.walls
        );
    }


}  
