const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 600;
let canvasPosition = canvas.getBoundingClientRect();
ctx.fillStyle = 'white';
const explosions = [];

class Explosion {
    constructor(x, y) {

        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'images/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio()
        this.sound.src = 'audio/boom.wav';
    }

    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 5 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', function (evt) {
    createAnimation(evt);
});

// window.addEventListener('mousemove', function (evt) {
//     createAnimation(evt);
// })

function createAnimation(evt) {
    let positionX = evt.x - canvasPosition.left;
    let positionY = evt.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    explosions.forEach((explosion, idx) => {
        explosion.update()
        explosion.draw();
        if (explosions[idx].frame > 5) {
            explosions.splice(idx, 1);
        }
    })


    requestAnimationFrame(animate);
}

animate()
