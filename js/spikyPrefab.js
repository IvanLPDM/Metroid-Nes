class spikyPrefab extends enemyPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);  
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);     
    }   

    howItPatrols()
    {
        return (this.body.position.x > config.width - 100 ||this.body.position.x < 50)
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