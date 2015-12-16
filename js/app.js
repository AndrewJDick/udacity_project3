// Continually determine whether any of the enemies have collided with the player
function checkCollisions() {

    for (var i in allEnemies) {

        if ((player.x < allEnemies[i].x + (allEnemies[i].width - 20)) &&
            (player.x + player.width > allEnemies[i].x) &&
            (player.y === allEnemies[i].y)) {

            // Subtracts 1 from player's total lives, then resets the player to their starting position
            player.lives = player.lives - 1;
            player.reset();
        }
    }
};


// Assigns either a x- or y-coordinate to an object. The range of values represent each of the stone tiles.
function xyCoords(axis) {

    var xCoord = [0, 100, 200, 300, 400];
    var yCoord = [60, 140, 220];

    if (axis === 'x') {
        coord = xCoord;
    }

    else if (axis === 'y') {
        coord = yCoord;
    }

    var coordinate = coord[Math.floor(Math.random() * coord.length)];
    return coordinate;
};


// Enemies
var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.coordinates();
    this.moveSpeed();

    this.width = 101;
    this.height = 171;
};

Enemy.prototype.coordinates = function() {

    this.x = -100;
    this.y = xyCoords('y');
};

Enemy.prototype.moveSpeed = function() {

    var maxSpeed = 500;
    var minSpeed = 200;

    // Assign a random move speed multiplier (min-max inclusive).
    this.moveMultiplier = Math.floor(Math.random() * (maxSpeed - minSpeed) + minSpeed);
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.update = function(dt) {

    // Multiplying the moveMultiplier by dt ensures the game runs at the same speed for all computers.
    this.x = this.x + (dt * this.moveMultiplier);

    // Reset the enemy's position and apply a new moveSpeed multiplier once it travels off-screen.
    if (this.x > 550) {

        this.coordinates();
        this.moveSpeed();
    }
};


// Pickups
var Pickup = function() {

    this.pickupItem();
    this.x = xyCoords('x');
    this.y = xyCoords('y');

};

Pickup.prototype.pickupItem = function () {

    var pickup = ['images/gem-green.png', 'images/gem-blue.png', 'images/gem-orange.png', 'images/Key.png', 'images/Heart.png', 'images/Star.png' ];

    // Pickups worth more to the player have a smaller chance of spawning.
    probVal = Math.random();

    // Star (100 Points)
    if (probVal >= 0.9) {
        this.sprite = pickup[5];
        this.value = 100;
    }

    // Heart (+1 Life)
    else if ((0.75 < probVal) && (probVal < 0.9)) {
        this.sprite = pickup[4];
        this.value = 1;
    }

    // Key (50 Points)
    else if ((0.55 <= probVal) && (probVal <= 0.75)) {
        this.sprite = pickup[3];
        this.value = 50;
    }

    // Gems (25 Points)
    else {
        this.sprite = pickup[Math.floor(Math.random() * (pickup.length - 3))];
        this.value= 25;
    }
};

Pickup.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), pickup0.x, pickup0.y);

};


// Player
var Player = function () {

    this.sprite = 'images/char-boy.png';
    this.reset();

    this.width = 101;
    this.height = 171;

    this.lives = 3;

    this.score = 0;

};

Player.prototype.handleInput = function(control) {

    if ((control === 'W' || control === 'up') && this.y > 0) {
        this.y = this.y - 80;
    }

    if ((control === 'S' || control === 'down') && this.y < 375) {
        this.y = this.y + 80;
    }

    if ((control === 'A' || control === 'left') && this.x > 0) {
        this.x = this.x - 100;
    }

    if ((control === 'D' || control === 'right') && this.x < 400) {
        this.x = this.x + 100;
    }
};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {

    // Static starting position for the player
    this.x = 200;
    this.y = 380;
};

Player.prototype.update = function () {

    // Award points and reset the player if they make it to the water.
    // To-Do: Reset pickups
    if (this.y === -20) {
        this.reset();
        this.score = this.score + 50;
    }

    // Award points whenever a player lands on a pickup
    // for (var i in allPickups) {

    //     if ((this.x === allPickups[i].x) && (this.y === allPickups[i].y)) {

    //         if (allPickups[i] === 'images/gem-orange.png') {
    //             this.score = this.score + pickup0.value;
    //         }

    //         else {
    //             this.lives = this.lives + allPickups[i].value;
    //         }
    //     }
    // }
};


// Now instantiate your objects.
var enemy0 = new Enemy();
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy0, enemy1, enemy2];

var player = new Player();

var pickup0 = new Pickup();
var allPickups = [pickup0];

console.log (pickup0.sprite);
console.log (pickup0.value);
console.log (pickup0.x);
console.log (pickup0.y);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        87: 'W',
        65: 'A',
        83: 'S',
        68: 'D',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
