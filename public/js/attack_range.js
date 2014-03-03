var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var marine, baneling;
var circle;



function Baneling(x, y) {
	this.speed = 100;
	this.range = 400;
	this.sprite = game.add.sprite( 100, game.world.centerY, 'baneling');
	this.sprite.anchor.setTo(0.5, 0.5);

	this.circle = new Phaser.Circle(this.sprite.x, this.sprite.y, this.range);
}

Baneling.prototype.updateRange = function() {
	this.circle = new Phaser.Circle(this.sprite.x, this.sprite.y, this.range);
}

function Marine(x, y) {
	this.sprite = game.add.sprite(x, y, 'marine');
	this.sprite.anchor.setTo(0.5, 0.5);
}


function preload() {
	game.load.image('background','assets/green_cup.png');
	game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
	game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
}

function create() {
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
	marine = new Marine(600, 200);
	baneling = new Baneling(100, 300);

	baneling.sprite.body.velocity.x = baneling.speed;
}

function update() {
	game.physics.collide(marine.sprite, baneling.sprite, banelingHitMarine, null, this);
	

	// Update the banelings attack range as it moves
	baneling.updateRange();

	//If the target marine is within range move to it
	if(baneling.circle.contains(marine.sprite.x, marine.sprite.y) ) {
		game.physics.moveToObject(baneling.sprite, marine.sprite, baneling.speed * 2);
	}

	
}

function banelingHitMarine() {
	marine.sprite.kill();
	baneling.sprite.kill();
}

function render() {

}
