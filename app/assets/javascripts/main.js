var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background, time_warp_button, forcefield_button;
var marines, banelings, explosions, forcefields;
var round_text, score_text, prompt_text, timewarp_text, forcefield_text;
var round, score, prompt_content, num_timewarps, num_forcefields;


function createMarines(row, col) {

    for(var y = 0; y < col; y++) {
        for(var x = 0; x < row; x++) {
            var marine = marines.create(x * 35, y * 35 , 'marine');
            marine.alpha = 0.5;
            marine.anchor.setTo(0.5, 0.5);
            marine.body.immovable = true;

            marine.inputEnabled = true;
            marine.input.enableDrag(false, true);
            marine.events.onInputDown.add(selected, this);
        }
    }  

    marines.x = game.world.centerX - 70;
    marines.y = game.world.centerY - 70; 
    marines.setAll('body.collideWorldBounds', true);
}

function selected(sprite, pointer) { sprite.alpha = 1; }

function createBanelings(num_active) {

    banelings.createMultiple(100, 'baneling');  
    banelings.setAll('anchor.x', 0.5);
    banelings.setAll('anchor.y', 0.5);
    banelings.setAll('outOfBoundsKill', true);

    for(var i = 0; i < num_active; i ++) { 

        var baneling = banelings.getFirstDead(); 
        var rand = Math.floor((Math.random()*40)+1);

        if( rand % 4 == 0 )
            baneling.reset(game.world.randomX,0);
        else if( rand % 4 == 1 )
            baneling.reset(0,game.world.randomY);
        else if( rand % 4 == 2 )
            baneling.reset(800, game.world.randomY);
        else
            baneling.reset(game.world.randomX, 600);

        game.physics.moveToXY(baneling, game.world.randomX, game.world.randomY, 60);    
        baneling.events.onKilled.add(playExplosion, baneling);
    }
}

function playExplosion(baneling) {

    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(baneling.x, baneling.y);
    explosionAnimation.play('boom', 120, false, true);
}

function createExplosions(num_explosions) {

    for (var i = 0; i < num_explosions; i++) {
        var explosionAnimation = explosions.create(100, 0, 'boom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('boom');

        explosionAnimation.events.onAnimationComplete.add(checkNextRound, this);
    }
}

function createText() {

    round = 1;
    round_text = game.add.text(50, 25, "Round:" + round, 
        { font: "24px Arial", fill: "#ff0044" });
    round_text.anchor.setTo(0.5, 0.5);

    score = 0;
    score_text = game.add.text(200, 25, "Score:" + score, 
        { font: "24px Arial", fill: "#ff0044" });
    score_text.anchor.setTo(0.5, 0.5);

    num_timewarps = 2;
    timewarp_text = game.add.text(700, 575, "Time Warps:" + num_timewarps, 
        { font: "24px Arial", fill: "#0061d8" });
    timewarp_text.anchor.setTo(0.5, 0.5);

    num_forcefields = 3;
    forcefield_text = game.add.text(500, 575, "Forcefields" + num_forcefields, 
        { font: "24px Arial", fill: "#0061d8" });
    forcefield_text.anchor.setTo(0.5, 0.5);

    prompt_content = "";
    prompt_text = game.add.text(600, 36, prompt_content, 
        { font: "36px Arial", fill: "#000000" });
    prompt_text.anchor.setTo(0.5, 0.5);
}

function updateText() {
    score_text.content = "Score: " + score;
    round_text.content = "Round: " + round;
    timewarp_text.content = "Time Warps: " + num_timewarps;
    forcefield_text.content = "Forcefields: " + num_forcefields;
    prompt_text.content = prompt_content;

}

function checkNextRound() {

    if( banelings.countLiving() == 0 && marines.countLiving()) {
        prompt_content = "Next Round!";
        advanceRound();
        restart();
    }
    if (marines.countLiving() == 0)        
        prompt_content = "Game Over!";
}

function advanceRound() {
    round += 1;
    score += marines.countLiving();
}

function restart() {
    // marines.callAll('revive');
    marines.setAll('alpha', 0.5)
 
    banelings.removeAll();
    createBanelings(4 + round);

    explosions.removeAll();
    createExplosions(4 + round);

    forcefields.removeAll();
    num_forcefields = 3;
}

function createForcefield() {

    if( num_forcefields > 0 ) {
        var forcefield = forcefields.create(game.input.activePointer.x, game.input.activePointer.y, 'forcefield');
        forcefield.anchor.setTo(0.5, 0.5);
        forcefield.health = 5
        forcefield.body.angularVelocity = 50;
        num_forcefields -= 1;
    }
}

function timeWarp() {
    
    if(num_timewarps > 0) {
        banelings.forEach(function(baneling) {
            baneling.body.velocity.x = baneling.body.velocity.x/2;
            baneling.body.velocity.y = baneling.body.velocity.y/2;
            baneling.body.angularVelocity = 100;
        });
        num_timewarps -= 1;
        prompt_content = "Time Warp Activated";

    }  
}

function banelingHitMarine(baneling, marine) {

    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(marine.x, marine.y);
    explosionAnimation.play('boom', 120, false, true);

    baneling.kill();
    marine.kill();
}

function banelingHitForcefield(baneling, forcefield) {

    baneling.kill();
    forcefield.health -= 1;

    if(forcefield.health == 0)
        forcefield.kill();
}





function preload() {
    game.load.image('background','assets/green_cup.png', 256, 256);
    game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
    game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
    game.load.spritesheet('boom', 'assets/explosion.png', 64, 64, 23);
    game.load.spritesheet('forcefield', 'assets/forcefield.png', 100, 87)


}

function create() {

	background = game.add.tileSprite(0, 0, 800, 600, 'background');
    // background = game.stage.backgroundColor = '#a3a3a3';

    marines = game.add.group();
    createMarines(4, 4);

    banelings = game.add.group();
    createBanelings(4);

    explosions = game.add.group();
    createExplosions(4);

    forcefields = game.add.group();

    createText();

    time_warp_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    time_warp_button.onDown.add(timeWarp, this);

    forcefield_button = game.input.keyboard.addKey(Phaser.Keyboard.F)
    forcefield_button.onDown.add(createForcefield, this); 
}


function update() {

    game.physics.collide(forcefields);
    game.physics.collide(marines);
    game.physics.collide(marines, forcefields);

    this.game.physics.overlap(marines, banelings, banelingHitMarine, null, this); 
    this.game.physics.overlap(marines, explosions, banelingHitMarine, null, this); 
    this.game.physics.overlap(banelings, forcefields, banelingHitForcefield, null, this);

    updateText();
}

function render () { }