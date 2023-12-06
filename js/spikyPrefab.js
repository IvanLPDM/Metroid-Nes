class spikyPrefab extends enemyPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);  

        this.velocityX = 20;
        this.velocityY = 0;

        this.body.setVelocityX(this.velocityX);
        this.body.setVelocityY(this.velocityY);
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
            this.body.setVelocityX(this.velocityX);
            this.body.setVelocityY(this.velocityY);
            this.flipX = !this.flipX;
        }

        this.anims.play('spiky_horizontal',true);
        super.preUpdate(time, delta);
    }
}