export class Dog {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    idle = true;
    midAir = false;
    underground = false;
    facingLeft = true;

    diggingProgress = 0;

    isPolinated = false;
    polinationTimeout = null;

    speedX = 0;
    speedY = 0;
}