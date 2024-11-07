export class MoveRight {
    constructor(puppet) {
        this.puppet = puppet;
    }

    execute() {
        this.puppet.speedX = 16;
        this.puppet.facingLeft = false;
        this.puppet.idle = false;
    }
}