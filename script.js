const gameContainer = document.getElementById("game-container");
const birdElement = document.getElementById("bird");

const CONFIG = {
    minSpeed: 0.5,
    maxSpeed: 0.5,
};

class Game {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius =  getElementRadius(birdElement);
        this.birdStatus = "flying.mid";
        this.birdUpFlapImgSrc = 'assets/bird-upflap.png';
        this.birdMidFlapImgSrc = 'assets/bird-midflap.png';
        this.birdDownFlapImgSrc = 'assets/bird-downflap.png';
        this.setBirdStatus(this.birdStatus);
    }

    setBirdStatus(status) {
        let imageSrc;
        switch (status) {
            case "flying.up":
                imageSrc = this.birdUpFlapImgSrc;
                break;
            case "flying.mid":
                imageSrc = this.birdMidFlapImgSrc;
                break;
            case "flying.down":
                imageSrc = this.birdDownFlapImgSrc;
                break;
            default:
                return;
        }
        birdElement.src = imageSrc
    }

    update() {
        this.y += this.dy;
        if (this.y + birdElement.rad > gameContainer.clientHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        birdElement.style.top = `${this.y - this.radius}px`;
        birdElement.style.left = `${this.x - this.radius}px`;
    }
}
function getElementRadius(element) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const radius = Math.min(width, height) / 2;
    return radius;
}

function initGame() {
    const x = gameContainer.clientWidth / 3;
    const y = gameContainer.clientHeight / 2;
    const dx = (Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed) * (Math.random() < 0.5 ? 1 : -1);
    const dy = (Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed) * (Math.random() < 0.5 ? 1 : -1);
    const game = new Game(x, y, dx, dy);
    game.setBirdStatus("flying.mid");
    return game;
}

function handleFlying(game) {
    setTimeout(() => {
        game.setBirdStatus("flying.up");
        setTimeout(() => {
            game.setBirdStatus("flying.mid");
            setTimeout(() => {
                game.setBirdStatus("flying.down");
            }, 100);
        }, 100);
    }, 100);
}

const game = initGame();

const animate = () => {
    game.update();
    handleFlying(game);
    requestAnimationFrame(animate);
};

animate();
