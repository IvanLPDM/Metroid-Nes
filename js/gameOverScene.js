class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    create() {
        this.add.rectangle(0, 0, config.width, config.height, 0x000000, 0.7).setOrigin(0);

        this.add.text(config.width / 2, 100, 'Game Over', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        const scores = this.getHighScores();
        let y = 150;
        scores.forEach((score, index) => {
            this.add.text(config.width / 2, y, `${index + 1}. ${score}`, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            y += 30;
        });
    }

    getHighScores() {
        return [1000, 800, 600, 400, 200];
    }
}