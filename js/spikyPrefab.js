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
        return (this.body.position.x > this.body.position.x + 50 ||this.body.position.x < this.body.position.x - 50)
    }

    preUpdate(time,delta)
    {

        this.scene.physics.world.collide(this, this.scene.doorplat, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.doorplat1, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.doorplat2, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.doorplat3, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.doorplat4, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.doorplat5, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.platform, this.handlePlatformCollision, null, this);

        /*if(this.howItPatrols())
        {
            this.direccion *= -1;
            this.body.setVelocityX(this.velocityX);
            this.body.setVelocityY(this.velocityY);
            this.flipX = !this.flipX;
        }*/

        this.anims.play('spiky_horizontal',true);
        super.preUpdate(time, delta);
    }

    handlePlatformCollision(spiky, platform) {
        // Cambia de dirección al colisionar con una plataforma
        this.velocityX *= -1;
        this.body.setVelocityX(this.velocityX);
        this.flipX = !this.flipX;
    }
}