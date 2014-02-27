// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background;
var cursors;
var clickedx, clickedy;
var start_x,start_y,end_x,end_y;
var marines;

function createMarines() {
    for(var y = 0; y < 5; y++) {
        for(var x = 0; x < 6; x++) {
            var marine = marines.create(x * 50, y * 50, 'marine');
            marine.alpha = 0.5
            marine.anchor.setTo(0.5, 0.5);
            marine.body.immovable = true;

            marine.inputEnabled = true;
            marine.input.enableDrag(false, true)
            marine.events.onInputDown.add(selected, this);
        }
    }   
    marines.x = 300;
    marines.y = 200;
    marines.setAll('body.collideWorldBounds', true);
    marines.setAll('body.minBounceVelocity', 0);
}

function selected(sprite, pointer) {
    sprite.alpha = 1;
}


function preload() {
	// Load Assets
	 game.load.image('background','assets/green_cup.png');
	 game.load.spritesheet('marine', 'assets/marine.png', 50, 50);
	 game.load.spritesheet('baneling', 'assets/baneling.png', 50, 50);
}

function create() {
	// Create Sprites
	background = game.add.tileSprite(0, 0, 2000, 2000, 'background');
    game.world.setBounds(0, 0, 2000, 2000);

    marines = game.add.group();
    createMarines();

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// Set Physics
	// Write out Inputs Events
    game.physics.collide(marines);


    if(game.input.mousePointer.isDown && game.input.mouse.button == 3) {
        game.physics.moveToPointer(marines.cursor.head, 400);
        clickedx = game.input.mousePointer.x;
        clickedy = game.input.mousePointer.y; 
    }
    if (Phaser.Rectangle.contains(marines.cursor.body, clickedx, clickedy)) {
        marines.cursor.body.velocity.setTo(0, 0);
    }

    // if(game.input.mousePointer.isDown && start_x == undefined && start_y == undefined) {
    //         start_x = game.input.mousePointer.x;
    //         start_y = game.input.mousePointer.y; 
    //         console.log(start_x + " , " + start_y);
    // }
    // if(game.input.mousePointer.isUp && (start_x != undefined && start_y != undefined)) {
    //         if(end_x == undefined && end_y == undefined) {
    //             end_x = game.input.mousePointer.x;
    //             end_y = (game.input.mousePointer.y); 
    //             console.log(end_x + " , " + end_y); 
    //         }
    // }
    // marine_array = marines._container.children;
    // for(var i = 0; i < marine_array.length; i++) {
    //     if( (start_x < marine_array[i].x && marine_array[i].x < end_x) 
    //         && (start_y < marine_array[i].y && marine_array[i].x < end_y ) ) {
    //             marine_array[i].alpha = 1;
    //     }
    // }



    // Mouse Camera Controls
    if(game.input.mousePointer.x < game.width && game.input.mousePointer.x > game.width - 250) {
   		game.camera.x += 20;
    }
    else if(game.input.mousePointer.x > 0 && game.input.mousePointer.x < 250) {
    	game.camera.x -= 20;
    }
    if(game.input.mousePointer.y < game.height && game.input.mousePointer.y > game.height - 150) {
   		game.camera.y += 20;
    }
    else if(game.input.mousePointer.y > 0 && game.input.mousePointer.y < 150) {
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

var floor;
function render () {
    // floor = new Phaser.Rectangle(start_x, start_y, end_x - start_x, end_y - start_y);
    // game.debug.renderRectangle(floor);
    // game.debug.stop();


}