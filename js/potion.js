class potion extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);    
    }   

    preUpdate(time,delta)
    {
        if(this.howItPatrols())
        {
            this.direccion *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }

        this.anims.play('spiky_horizontal',true);
        super.preUpdate(time, delta);
    }
}