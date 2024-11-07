export class MoveLeft {
    constructor(puppet) {
        this.puppet = puppet;
    }

    execute() {
        this.puppet.speedX = -16;
        this.puppet.facingLeft = true;
        this.puppet.idle = false;
    }
}