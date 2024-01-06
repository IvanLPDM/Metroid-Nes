class beanPrefab extends enemyPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);  

        this.velocityX = 50;
        this.velocityY = 0;

        this.body.setVelocityX(this.velocityX);
        this.body.setVelocityY(this.velocityY);

        this.body.allowGravity = false;
    }   

    preUpdate(time, delta) {
        // Detecta colisiones con plataformas
        this.scene.physics.world.collide(this, this.scene.room4wall1, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.room4wall2, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.plataformas, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.plataformas, this.handlePlatformCollision, null, this);
        this.scene.physics.world.collide(this, this.scene.plataformas, this.handlePlatformCollision, null, this);

    }

    handlePlatformCollision(bean, platform) {
        // Cambia de dirección al colisionar con una plataforma
        this.velocityX *= -1;
        this.body.setVelocityX(this.velocityX);
        this.flipX = !this.flipX;
    }
}