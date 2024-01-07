class ui extends Phaser.Scene
{

    constructor()
    {
        super({
            key: 'ui'
        })
    }

    create()
    {
        this.add.text(400,1800, 'puta', {
            fontSize: '32px'
        })
    }
}