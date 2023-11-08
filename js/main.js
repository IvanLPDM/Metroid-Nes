var gamePrefs=
{
    Player_SPEED:1,
    PLAYER_JUMP: 5,
    BULLET_SPEED:-100,
    ENEMY_BULLET_SPEED:100,
    ENEMY_SPEED:20,
    MAX_HEALTH_ENEMY:2,
    MAX_HEALTH:4,
    POWER_UP_SPEED:70,
    POWER_UP_HEAL:5
}

var config = 
{
    type: Phaser.AUTO,
    width: 128,
    height: 112,
    scene:[gamePlay], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:200}
        }
    }
};

var juego = new Phaser.Game(config);