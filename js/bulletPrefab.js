class bulletPrefab extends Phaser.GameObjects.Sprite
{
    //constructor(_scene,_posX,_posY,_spriteTag='bullet')
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        //this.nave = Scene.physics.add.sprite(posX,posY,spriteTag);
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        this.nivel = _scene;

        this.timer = _scene.time.addEvent({
            delay: 160,  // 3000 milisegundos = 3 segundos
            callback: this.deActivate,
            callbackScope: this
        })
    }
    


    deActivate()
    {
        this.destroy(this);
        //this.setTexture('explosionAnim');
    }

    preUpdate()
    {
        if(this.y<=0 || this.y>=config.height)
        {
            this.active = false;
        }
    }
}