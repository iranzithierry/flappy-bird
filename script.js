const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

class Element {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.birdUpFlapImgSrc = '/assets/bird-upflap.png';
        this.birdMidFlapImgSrc = '/assets/bird-midflap.png',
        this.birdDownFlapImgSrc = '/assets/bird-downflap.png';
    }
    drawRectangle() {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.rect(this.x, this.y, 100, 100);
        ctx.stroke();
    }
}
