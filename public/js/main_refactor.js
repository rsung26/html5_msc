var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var banelings;


function Baneling(index, game) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.alive = true;

    this.sprite =  game.add.sprite(x, y, 'baneling')
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.name = index.toString();
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
}

function Marine(index, game) {

	var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.alive = true;

    this.sprite =  game.add.sprite(x, y, 'marine')
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.name = index.toString();
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);

}

















function preload() {
     game.load.image('background','assets/green_cup.png');
     game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
     game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
     game.load.spritesheet('boom', 'assets/explosion.png', 64, 64, 23);
}

function create() {

	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	// Create All the Sprites/Groups/Objects

	banelings = [];

    for (var i = 0; i < 10; i++) {
        banelings.push( new Baneling(i, game) );
    }

	marines = [];

    for (var i = 0; i < 16; i++) {
        marines.push( new Marine(i, game) );
    }

}

function update() {

	// Set Controls
	// Set Physics Rules

}

// Render Debug Info
function render() {

}