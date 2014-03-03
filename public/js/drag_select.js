var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background;
var marines;

var starting_x, starting_y;
var ending_x, ending_y;
var height, width;

var select_rectangle;
var graphics;

var marines_group;

function Marine(index, game) {

	var x = game.world.randomX;
    var y = game.world.randomY;

    this.movingtoX;
    this.movingtoY;

    this.game = game;

    this.sprite =  game.add.sprite(x, y, 'marine')
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.alpha = 0.5;

    this.sprite.name = index.toString();
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce = 0;
}





function preload() {
     game.load.image('background','assets/green_cup.png');
     game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
}

function create() {

	background = game.add.tileSprite(0, 0, 800, 600, 'background');
    // marines_group = game.add.group();
	marines = [];

    for (var i = 0; i < 16; i++) {
        marines.push( new Marine(i, game) );
        // marines_group.add(marines[i].sprite);
    }


    // Define starting point and callback
    game.input.onDown.add(getPointerXY, this);
    game.input.onUp.add(selectUnits, this);
}   

function getPointerXY() {

    // Left Click
    if(game.input.mouse.button == 1) {

        for (var i = 0; i < marines.length; i++) {
            marines[i].sprite.alpha = 0.5;
        }

        graphics = game.add.graphics(0,0);
        starting_x = game.input.activePointer.x;
        starting_y = game.input.activePointer.y;
    }
    else if(game.input.mouse.button == 3) {
        rightClickMove();
    }
}

function selectUnits() {
    graphics.destroy();
    select_rectangle = new Phaser.Rectangle(starting_x, starting_y, width, height);

   for (var i = 0; i < marines.length; i++) {
       if(select_rectangle.contains(marines[i].sprite.x, marines[i].sprite.y)) {
            marines[i].sprite.alpha = 1;
       }
    }
}


function rightClickMove(marine) {
    for (var i = 0; i < marines.length; i++) {
       if( marines[i].sprite.alpha == 1 ) {
            game.physics.moveToPointer(marines[i].sprite, 400);
            marines[i].movingtoX = game.input.activePointer.x;
            marines[i].movingtoY = game.input.activePointer.y; 
       }
    }


}

function update() {

    // game.physics.collide(marines_group);

    // Note: need to implement for other directions
    if(game.input.activePointer.isDown) {

        ending_x = game.input.activePointer.x;
        ending_y = game.input.activePointer.y;
        width = ending_x - starting_x;
        height = ending_y - starting_y;


        graphics.beginFill(0xFF3300);
        graphics.lineStyle(2, 0xFF3300, 1);
        graphics.drawRect(starting_x, starting_y, width, height); 

    }

    // Have Marines stop at the right clicked point
    for (var i = 0; i < marines.length; i++) {
        if (Phaser.Rectangle.contains(marines[i].sprite.body, marines[i].movingtoX, marines[i].movingtoY)) {
            marines[i].sprite.body.velocity.setTo(0, 0);
        }
    }


}

// Render Debug Info
function render() {

}