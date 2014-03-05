var game_two = new Phaser.Game(800, 300, Phaser.AUTO, 'attack-range', { preload: preload, create: create, update: update, render: render });
var marine2, baneling2;

function Baneling2(x, y) {
	this.speed = 200;
	this.range = 400;
	this.sprite = game_two.add.sprite( 100, game_two.world.centerY, 'baneling');
	this.sprite.anchor.setTo(0.5, 0.5);

	this.circle = new Phaser.Circle(this.sprite.x, this.sprite.y, this.range);
}

Baneling2.prototype.updateRange = function() {
	this.circle = new Phaser.Circle(this.sprite.x, this.sprite.y, this.range);
}

function Marine2(x, y) {
	this.sprite = game_two.add.sprite(x, y, 'marine');
	this.sprite.anchor.setTo(0.5, 0.5);
}


function preload() {
	game_two.load.image('background','green_cup.png');
	game_two.load.spritesheet('marine', 'marine.png', 30, 30);
	game_two.load.spritesheet('baneling', 'baneling.png', 25, 25);
}

function create() {
	// background = game_two.add.tileSprite(0, 0, 800, 300, 'background');
	background = game_two.stage.backgroundColor = '#cdb864';

	marine2 = new Marine2(600, 250);

	baneling2 = new Baneling2(100, 300);
	baneling2.sprite.body.velocity.x = baneling2.speed;
}

function update() {

	baneling2.updateRange();

	game_two.physics.collide(marine2.sprite, baneling2.sprite, banelingHitMarine, null, this);

	//If the target marine2 is within range move to it
	if( baneling2.circle.contains(marine2.sprite.x, marine2.sprite.y) )
		game_two.physics.moveToObject(baneling2.sprite, marine2.sprite, baneling2.speed * 2);
}

function banelingHitMarine() {
	marine2.sprite.kill();
	baneling2.sprite.kill();
	create();
}

function render() { }