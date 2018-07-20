const posX = [0, 100, 200, 300, 400];
const enemyPosY = [50, 150, 225];
const playerMovePosY = [-40, 50, 150, 225, 300, 400];

class Enemy{

    constructor(){

        this.sprite = 'images/enemy-bug.png';
        this.x = getRandomItem(posX);
        this.y = getRandomItem(enemyPosY);
        this.speed = 200;
    }

    update(dt){
        this.x = (this.x + this.speed * dt);
        if(this.x > 450){
            this.x = -50; //Updated enemy's position
            this.y = getRandomItem(enemyPosY); //Updated enemy's position
            this.speed = 200 * Math.random() + 100; // Updated speed of enemy
        }                       

        if(Math.abs(this.x-player.x) < 50 && this.y === playerMovePosY[player.row]){
            player.x = getRandomItem(posX);
            player.row = getRandomItem([4,5]); // handle collision when enemies hit the player
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

function getRandomItem(array){
    return array[Math.floor(array.length * Math.random())];
}

class Player{


    constructor(){
        this.sprite = 'images/char-cat-girl.png';
        this.x = getRandomItem(posX);
        this.row = getRandomItem([4,5]);
    }

    update(){
        if(playerMovePosY[this.row] === playerMovePosY[0]){
            this.x = getRandomItem(posX);
            this.row = getRandomItem([4,5]); //Updated player's position when player reached the reiver
        }

    }

    render(){
        let y = playerMovePosY[this.row];
        ctx.drawImage(Resources.get(this.sprite), this.x, y);
    }

    handleInput(btnName){
        switch(btnName){

            case 'left':
            this.x = this.x - 100;
            if (this.x < 0){
                this.x = 0; // prevent player keep moving off the screen when the player move to the left most
            }
            break;
            
            case 'right':
            this.x = this.x + 100;

            if (this.x > 400){
                this.x = 400;
            }
            break;
            
            case 'up':
            
            this.row = this.row - 1;
            if(this.row < 0){
                this.row = 0; // win
            }

            break;
            
            case 'down':
            this.row = this.row + 1;
            if(this.row > 5){
                this.row = 5;
            }
            break;
        }
    }
}

window.allEnemies = [new Enemy(),new Enemy(), new Enemy(), new Enemy() ];
window.player = new Player();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
