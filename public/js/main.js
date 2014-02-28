// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background;
var cursors;
var clickedx, clickedy;

var marines, banelings, explosions;

function createMarines() {
    for(var y = 0; y < 4; y++) {
        for(var x = 0; x < 4; x++) {
            var marine = marines.create(x * 35, y * 35, 'marine');
            marine.alpha = 0.5
            marine.anchor.setTo(0.5, 0.5);
            marine.body.immovable = true;

            marine.inputEnabled = true;
            marine.input.enableDrag(false, true)
            marine.events.onInputDown.add(selected, this);
        }
    }   
    marines.x = game.world.centerX - 70;
    marines.y = game.world.centerY - 70;
    marines.setAll('body.collideWorldBounds', true);
    marines.setAll('body.minBounceVelocity', 0);
}

function createBanelings() {
    banelings.createMultiple(20, 'baneling');  
    banelings.setAll('anchor.x', 0.5);
    banelings.setAll('anchor.y', 0.5);

    banelings.setAll('outOfBoundsKill', true);

    for(var i = 0; i < 10; i ++) { 
        var baneling = banelings.getFirstDead(); 
        baneling.reset(0, i * 30 - 100);

        this.game.physics.moveToObject(baneling, marines, 100)
    }
}

function createExplosions() {
    for (var i = 0; i < 5; i++) {
        var explosionAnimation = explosions.create(0, 0, 'boom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('boom');
    }
}

function selected(sprite, pointer) {
    sprite.alpha = 1;
}

function preload() {
	// Load Assets
	 game.load.image('background','assets/green_cup.png');
	 game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
	 game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
     game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
     game.load.spritesheet('boom', 'assets/explosion.png', 64, 64, 23);
}

function create() {
	// Create Sprites
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
    // game.world.setBounds(0, 0, 2000, 2000);

    marines = game.add.group();
    createMarines();

    banelings = game.add.group();
    createBanelings();

    explosions = game.add.group();
    createExplosions();

   
    
    cursors = game.input.keyboard.createCursorKeys();
}

function banelingHitMarine(baneling, marine) {

    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(marine.x, marine.y);
    explosionAnimation.play('boom', 30, false, true);

    baneling.kill();
    marine.kill();
}


function resetBaneling(baneling) {
    baneling.kill();
}

function rightClick(marine) {
    if(game.input.mousePointer.isDown && game.input.mouse.button == 3) {
        game.physics.moveToPointer(marine, 400);
        clickedx = game.input.mousePointer.x;
        clickedy = game.input.mousePointer.y; 
    }
    if (Phaser.Rectangle.contains(marine.body, clickedx, clickedy)) {
        marine.cursor.body.velocity.setTo(0, 0);
    }
}

function update() {
	// Set Physics
	// Write out Inputs Events
    game.physics.collide(marines);
    // game.physics.collide(banelings);
    this.game.physics.overlap(marines, banelings, banelingHitMarine, null, this); 


    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        console.log("Time Warp should happen");
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

    // // Mouse Camera Controls
    // if(game.input.mousePointer.x < game.width && game.input.mousePointer.x > game.width - 250) {
    //  game.camera.x += 20;
    // }
    // else if(game.input.mousePointer.x > 0 && game.input.mousePointer.x < 250) {
    //  game.camera.x -= 20;
    // }
    // if(game.input.mousePointer.y < game.height && game.input.mousePointer.y > game.height - 150) {
    //  game.camera.y += 20;
    // }
    // else if(game.input.mousePointer.y > 0 && game.input.mousePointer.y < 150) {
    //  game.camera.y -= 20;
    // }
}

function render () {

}