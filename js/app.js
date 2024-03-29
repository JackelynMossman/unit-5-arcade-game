// Enemies the player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set starting location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
	
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'img/Heart.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;

    // reset bugs position when hit border
    if (this.x > 600) {
        this.x = -50;
    }

    // reset player position when collide with enemy
    if (player.x > (this.x - 50) && player.x < (this.x + 50) && player.y > (this.y - 50) && player.y < (this.y + 50)) {
        player.resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player1 = 200;
var player2 = 404;

var Player = function() {
    // set player start location
    this.x = player1;
    this.y = player2;

    // load player image
    this.sprite = 'img/char-princess-girl.png';
};

// success message when player crosses street and resets player starting location
Player.prototype.update = function() {
    if (this.y <= 0) {
        alert("High Five! You are rockstar princess.");
        this.resetPlayer();
    }
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var LEFT_WALL = 0;
var RIGHT_WALL = 400;
var TOP_WALL = 0;
var BOTTOM_WALL = 404;
var PLAYER_HEIGHT = 101;
var PLAYER_WIDTH = 83;

// moves the player up, down, left, right
Player.prototype.handleInput = function(keyUp) {
    if (keyUp === 'left' && this.x > LEFT_WALL) {
        this.x = this.x - PLAYER_HEIGHT;
    } else if (keyUp === 'right' && this.x < RIGHT_WALL) {
        this.x = this.x + PLAYER_HEIGHT;
    } else if (keyUp === 'up' && this.y > TOP_WALL) {
        this.y = this.y - PLAYER_WIDTH;
    } else if (keyUp === 'down' && this.y < BOTTOM_WALL) {
        this.y = this.y + PLAYER_WIDTH;
    }
};

Player.prototype.resetPlayer = function() {
    this.x = player1;
    this.y = player2;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Start all enemies with varying speeds as they move across the game board
for (var i = 0; i < 3; i++) {
    var randomSpeed = Math.floor(Math.random() * 5 + Math.random() * 5) * 100;
    allEnemies.push(new Enemy(-50, (85 * i) + 60, randomSpeed));
}

// Place the player object in a variable called player
var player = new Player();

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
