class playerPref extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.health=gamePrefs.MAX_HEALTH;
        this.nivel=_scene;
        this.dead = false;
                        
    }

    Heal()
    {
       health += 2;

       if(health > MAX_HEALTH)
       {
          health = MAX_HEALTH;
       }
       this.shield.setFrame(health);
    }


    damage(_nave,_damageAgent)
    {
      if(!_damageAgent.active) return;

      this.health--;
      _damageAgent.deActivate();      

      if(this.health<0)
      {
        this.dead = true;
        //this.reset();
      }else
      {
        this.shield.setFrame(this.health);
      }
    }

    reset()
    {
        this.nivel.scene.restart();
    }

    preUpdate(time,delta)
    {        
        super.preUpdate(time, delta); 
    }
}