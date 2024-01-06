class spikyPinkPrefab extends enemyPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);  

        this.velocityX = 20;
        this.velocityY = 0;

        this.spawnpos = _posX;

        this.body.setVelocityX(this.velocityX);
        this.body.setVelocityY(this.velocityY);
    }   

    howItPatrols()
    {
        return (this.body.position.x > 2120 ||this.body.position.x < 2080)
        
    }

    preUpdate(time,delta)
    {
        if(this.howItPatrols())
        {
            this.velocityX *= -1;
            this.body.setVelocityX(this.velocityX);
            this.flipX = !this.flipX;
        }

        this.anims.play('spiky2_horizontal',true);
        super.preUpdate(time, delta);
    }
}