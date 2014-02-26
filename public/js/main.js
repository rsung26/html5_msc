// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var background;
var marine;
var cursors;

function preload() {
	// Load Assets
	 game.load.image('background','assets/green_cup.png');
	 game.load.spritesheet('marine', 'assets/marine.png', 50, 50);
	 game.load.spritesheet('baneling', 'assets/baneling.png', 52, 50);
}

function create() {
	// Create Sprites
	background = game.add.tileSprite(0, 0, 2000, 2000, 'background');
    game.world.setBounds(0, 0, 2000, 2000);

    // game.camera.setPosition(game.world.centerX - game.width/2, game.world.centerY - game.height/2);
 	marine = game.add.sprite(100, 100, 'marine');
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// Set Physics
	// Write out Inputs Events

    // Mouse Camera Controls
    if(game.input.mousePointer.x > game.width - 50 ) {
   		game.camera.x += 20;
    }
    else if(game.input.mousePointer.x < 0 + 50) {
    	game.camera.x -= 20;
    }

    if(game.input.mousePointer.y > game.height - 25) {
   		game.camera.y += 20;
    }
    else if(game.input.mousePointer.y < 0 + 25) {
    	game.camera.y -= 20;
    }

    //Arrow Key Camera Controls
	if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }
    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }

    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }
}
