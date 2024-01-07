
var gamePrefs=
{
    Player_SPEED:100,
    PLAYER_JUMP: 20,
    BULLET_SPEED:-100,
    ENEMY_BULLET_SPEED:100,
    ENEMY_SPEED:20,
    MAX_HEALTH_ENEMY:1,
    MAX_HEALTH:100,
    POWER_UP_SPEED:70,
    POWER_UP_HEAL:5
}

var config = 
{
    type: Phaser.AUTO,
    width: 2400,
    height: 1960,//240
    scene:[startScene, gamePlay, loseScene, ui], //array con las escenas
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
            gravity:{y:400}
        }
    }
};

var juego = new Phaser.Game(config);