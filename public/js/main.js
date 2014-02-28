var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background;
var cursors;
var clickedx, clickedy;

var marines, banelings, explosions;
var banelings_on_screen;

var round_text, score_text, prompt_text, timewarp_text;
var round, score, num_timewarp;

var time_warp_button, restart_button;


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
    banelings.createMultiple(100, 'baneling');  
    banelings.setAll('anchor.x', 0.5);
    banelings.setAll('anchor.y', 0.5);
    banelings.setAll('outOfBoundsKill', true);

    for(var i = 0; i < 4; i ++) { 
        var baneling = banelings.getFirstDead(); 
        baneling.reset(0, i * 30);

        baneling.inputEnabled = true;
        baneling.events.onKilled.add(checkNextRound, this)

        this.game.physics.moveToObject(baneling, marines, 100)
    }
}

function checkNextRound() {
    if (marines.countLiving() == 0) {
        prompt_text.content = "No More Marines";
        restart();
    }
    if( banelings.countLiving() == 0 && marines.countLiving() ) {
        prompt_text.content = "Next Round...";
        advanceRound();
    }
}

function advanceRound() {
    console.log("advanceRound being called");
    round += 1;
    score += marines.countLiving() - 1;
    console.log(round);
    console.log(score);
    score_text.content = "Score: " + score;
    round_text.content = "Round: " + round;
    restart();
}

function restart() {
    console.log("Game should restart");

    // marines.removeAll();
    // banelings.removeAll();
    // explosions.removeAll();

    // createMarines();
    // createBanelings();
    // createExplosions();


    // round_text.destroy();
    // score_text.destroy();
    // timewarp_text.destroy();
    // prompt_text.destroy();

    // createText();

    create();
}



function createExplosions() {
    for (var i = 0; i < 4; i++) {
        var explosionAnimation = explosions.create(0, 0, 'boom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('boom');
    }
}

function createText() {
    round = 1;
    round_text = game.add.text(50, 25, "Round:" + round, { font: "24px Arial", fill: "#ff0044" });
    round_text.anchor.setTo(0.5, 0.5);

    score = 0;
    score_text = game.add.text(200, 25, "Score:" + score, { font: "24px Arial", fill: "#ff0044" });
    score_text.anchor.setTo(0.5, 0.5);

    num_timewarp = 3;
    timewarp_text = game.add.text(625, 550, "Time Warps:" + num_timewarp, { font: "24px Arial", fill: "#ff0044" });
    timewarp_text.anchor.setTo(0.5, 0.5);

    prompt_text = game.add.text(600, 24, "PROMPT AREA", { font: "24px Arial", fill: "#ff0044" });
    prompt_text.anchor.setTo(0.5, 0.5);
}

function destoryAllText() {
    round_text.destroy();
    score_text.destroy();
    timewarp_text.destroy();
    prompt_text.destroy();
}

function selected(sprite, pointer) {
    sprite.alpha = 1;
}

function preload() {
     game.load.image('background','assets/green_cup.png');
     game.load.spritesheet('marine', 'assets/marine.png', 30, 30);
     game.load.spritesheet('baneling', 'assets/baneling.png', 25, 25);
     game.load.spritesheet('boom', 'assets/explosion.png', 64, 64, 23);
}

function create() {

	background = game.add.tileSprite(0, 0, 800, 600, 'background');

    marines = game.add.group();
    createMarines();

    banelings = game.add.group();
    createBanelings();

    explosions = game.add.group();
    createExplosions();

    createText();

    // cursors = game.input.keyboard.createCursorKeys();

    time_warp_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    time_warp_button.onDown.add(timeWarp, this);

    restart_button = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    restart_button.onDown.add(restart, this);
}



function banelingHitMarine(baneling, marine) {
    baneling.kill();
    marine.kill();
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(marine.x, marine.y);
    explosionAnimation.play('boom', 30, false, true);
}

function timeWarp() {
    if(num_timewarp > 0) {
        banelings.forEach(function(baneling) {
            this.game.physics.moveToObject(baneling, marines, 100/2)
        });
        num_timewarp -= 1;
        timewarp_text.content = "Time Warps:" + num_timewarp;
    }  
}

function update() {
    game.physics.collide(marines);
    // game.physics.overlap(banelings);
    this.game.physics.overlap(marines, banelings, banelingHitMarine, null, this); 
    this.game.physics.overlap(marines, explosions, banelingHitMarine, null, this); 

}

function render () {

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