const revealEvent = new Phaser.Events.EventEmitter();

class Example extends Phaser.Scene
{


    preload ()
    {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create ()
    {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo);

        // Center of the screen
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        // Size of each square
        const squareSize = 100; // Adjust this to your desired size
        const squares = this.add.group(); // Create a group to hold the squares


        const result = [
            [2,5,15],
            [3,15,1],
            [8,5,15],
        ];

        let found = 0;

        // Create a 3x3 grid of squares
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const x = centerX - squareSize + col * squareSize;
                const y = centerY - squareSize + row * squareSize;

                const square = this.add.rectangle(x, y, squareSize, squareSize, 0x00ff00); // Change color as needed
                square.setStrokeStyle(2, 0xff0000); // Add a red border (optional)
                // Add a click event listener to change the square's color
                square.setInteractive({ useHandCursor: true });
                square.on('pointerdown', () => {
                    // Change the color when clicked
                    square.fillColor = Phaser.Math.RND.integer(); // Change to a random color
                    const text = this.add.text(x, y, result[row][col], { fontSize: '24px', fill: '#fff' });
                    text.setOrigin(0.5);

                    square.numberText = text;

                    if (result[row][col] == 15) {
                        found ++;
                        if (found == 3) {
                           revealEvent.emit('reveal');
                        }
                    }
                });

                revealEvent.on('reveal', () => {
                    // Change the color when clicked
                    square.fillColor = Phaser.Math.RND.integer(); // Change to a random color
                    const text = this.add.text(x, y, result[row][col], { fontSize: '24px', fill: '#fff' });
                    text.setOrigin(0.5);

                    square.numberText = text;
                });

                squares.add(square); // Add the square to the group
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const game = new Phaser.Game(config);
