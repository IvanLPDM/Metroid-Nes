class batPrefab extends enemyPrefab
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.body.setAllowGravity(false);
        this.health = gamePrefs.MAX_HEALTH_ENEMY;
    }   

    bathowItPatrols()
    {
        return (this.scene.player.body.position.x >= this.body.position.x)
    }

    preUpdate(time,delta)
    {
        if(this.bathowItPatrols()){

            this.body.setVelocityY(gamePrefs.ENEMY_SPEED + 100);
            //this.anims.play("bat_anim",true);
        }
        super.preUpdate(time, delta);
    }
}