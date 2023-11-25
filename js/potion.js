class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spritetag) {
        super(scene, x, y, spritetag);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        
        this.body.setAllowGravity(false);

        this.body.setVelocity(0, 0);

        this.body.setImmovable(true);
       
        this.setScale(0.5);

        // Puedes agregar más lógica de inicialización aquí
    }
}