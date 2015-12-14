// Co-ordinates

// Function to assign either a static x- or y-value to an object. The values represent each of the stone tiles.
function xyCoords(axis) {

    var xCoord = [0, 100, 200, 300, 400];
    var yCoord = [60, 140, 220];
    var coord;

    if (axis === 'x') {
        coord = xCoord;
    }

    else if (axis === 'y') {
        coord = yCoord;
    }

    var coordinate = coord[Math.floor(Math.random() * coord.length)];
    return coordinate;

};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = xyCoords('y');

    // Assign a random move speed multiplier.
    var moveSpeed = function () {

        return Math.floor(Math.random() * (500 - 100) + 100);

    };

    this.speed = moveSpeed();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Multiplying by dt ensures the game runs at the same speed for all computers.
    this.x = this.x + (dt * this.speed);

    if (this.x > 550) {
        this.x = -100;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Gems = function() {
    // Variables applied to each of our instances go here,
    var gemSelector = ['images/gem-green.png', 'images/gem-blue.png', 'images/gem-orange.png' ];

    this.sprite = 'images/gem-green.png';
    this.x = xyCoords('x');
    this.y = xyCoords('y');

};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player

// Now write your own player class. This class requires an update(), render() and a handleInput() method.
var Player = function () {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 375;

};

Player.prototype.update = function () {

};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function () {


};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy0 = new Enemy();
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy0, enemy1, enemy2];

// Place the player object in a variable called player
var player = new Player();

var gem0 = new Gems();

console.log(gem0.x);
console.log(gem0.y);
console.log(gem0.sprite);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
