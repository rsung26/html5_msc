// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var background;
var marine;
var cursors;
var test;
var clickedx, clickedy;

function Marine(index, game) {

	this.game = game;
	this.selected = false;

 	this.marine = game.add.sprite(100, 100, 'marine');
 	this.marine.anchor.setTo(0.5, 0.5);
 	this.marine.body.collideWorldBounds = true;
 	this.marine.inputEnabled = true;

 	var self = this;

 	this.marine.events.onInputDown.add(function() {
		self.selected = true;
    	console.log("unit now selected");
	}, this);
}


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

    // this.marines = game.add.group();
    // this.marines.createMultiple(20, 'marine');
    test = new Marine(0, game);
    // game.camera.setPosition(game.world.centerX - game.width/2, game.world.centerY - game.height/2);

    cursors = game.input.keyboard.createCursorKeys();
}


function update() {
	// Set Physics
	// Write out Inputs Events


	// if(game.input.mousePointer.isDown && game.input.mouse.button == 3 && test.selected == true) {

	// 	game.physics.moveToPointer(test.marine, 400);
	// 	clickedx = game.input.mousePointer.x;
	// 	clickedy = game.input.mousePointer.y; 
	// }

	// if (Phaser.Rectangle.contains(test.marine.body, clickedx, clickedy)) {
 //        test.marine.body.velocity.setTo(0, 0);
 //    }


    // Mouse Camera Controls
    if(game.input.mousePointer.x > game.width) {
   		game.camera.x += 20;
    }
    else if(game.input.mousePointer.x < 0) {
    	game.camera.x -= 20;
    }
    if(game.input.mousePointer.y > game.height) {
   		game.camera.y += 20;
    }
    else if(game.input.mousePointer.y < 0) {
    	game.camera.y -= 20;
    }

    //Arrow Key Camera Controls
	if (cursors.up.isDown) { 
		game.camera.y -= 4; 
	}
    else if (cursors.down.isDown) { 
    	game.camera.y += 4; 
    }
    if (cursors.left.isDown) { 
    	game.camera.x -= 4; 
    }
    else if (cursors.right.isDown) { 
    	game.camera.x += 4; 
    }
}