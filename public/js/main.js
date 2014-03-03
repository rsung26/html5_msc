var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

var background;
var marines, banelings, explosions;

var round_text, score_text, prompt_text, timewarp_text;
var round, score, prompt_content, num_timewarp;

var time_warp_button, restart_button;

function createMarines(row, col) {

    marines.x = game.world.centerX - 70;
    marines.y = game.world.centerY - 70; 

    for(var y = 0; y < col; y++) {
        for(var x = 0; x < row; x++) {
            var marine = marines.create(x * 35, y * 35 , 'marine');
            marine.alpha = 0.5;
            marine.anchor.setTo(0.5, 0.5);
            marine.body.immovable = true;

            marine.inputEnabled = true;
            marine.input.enableDrag(false, true)
            marine.events.onInputDown.add(selected, this);

        }
    }  

    marines.setAll('body.collideWorldBounds', true);
    marines.setAll('body.minBounceVelocity', 0);
}

function selected(sprite, pointer) {
    sprite.alpha = 1;
}

function createBanelings(num_active) {

    banelings.createMultiple(100, 'baneling');  
    banelings.setAll('anchor.x', 0.5);
    banelings.setAll('anchor.y', 0.5);
    banelings.setAll('outOfBoundsKill', true);

    for(var i = 0; i < num_active; i ++) { 

        var baneling = banelings.getFirstDead(); 
        baneling.reset(50, i * 50);

        game.physics.moveToXY(baneling, game.world.centerX, game.world.centerY, 100);    
    }
}

function createExplosions(num_explosions) {

    for (var i = 0; i < num_explosions; i++) {
        var explosionAnimation = explosions.create(100, 0, 'boom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('boom');

        // explosionAnimation.events.onAnimationComplete.add(checkNextRound, this);
    }

}

function checkNextRound() {

    console.log("checkNextRound():" + banelings.countLiving() )

    if( banelings.countLiving() == 0 && marines.countLiving()) {
        prompt_content = "Next Round...";
        advanceRound();
        restart();
    }
    if (marines.countLiving() == 0) {
        prompt_content = "Restarting Round...";
        restart();
    }


}

function advanceRound() {
    round += 1;
    score += marines.countLiving();
}


function restart() {
    console.log("round should reset");

    // marines.removeAll();
    // createMarines(5,5);  
    // banelings.removeAll();
    // createBanelings(3 + round);

    // explosions.removeAll();
    // createExplosions(3 + round);
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

    prompt_content = "PROMPT AREA";
    prompt_text = game.add.text(600, 24, prompt_content, { font: "24px Arial", fill: "#ff0044" });
    prompt_text.anchor.setTo(0.5, 0.5);
}

function updateText() {
    score_text.content = "Score: " + score;
    round_text.content = "Round: " + round;
    timewarp_text.content = "Time Warps: " + num_timewarp;
    prompt_text.content = prompt_content;

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
    createMarines(5, 5);

    banelings = game.add.group();
    createBanelings(4);

    explosions = game.add.group();
    createExplosions(4);

    createText();

    time_warp_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    time_warp_button.onDown.add(timeWarp, this);

    restart_button = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    restart_button.onDown.add(checkNextRound, this);
}



function banelingHitMarine(baneling, marine) {
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(marine.x, marine.y);
    explosionAnimation.play('boom', 120, false, true);

    baneling.kill();
    marine.kill();
}





function update() {
    game.physics.collide(marines);
    this.game.physics.overlap(marines, banelings, banelingHitMarine, null, this); 
    this.game.physics.overlap(marines, explosions, banelingHitMarine, null, this); 

    updateText();
}

function render () {

}


function timeWarp() {
    if(num_timewarp > 0) {
        banelings.forEach(function(baneling) {
            game.physics.moveToXY(baneling, game.world.width, game.world.height, 50);
        });
        num_timewarp -= 1;
    }  
}