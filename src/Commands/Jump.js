export class Jump {
    constructor(puppet) {
        this.puppet = puppet;
    }

    execute() {
        this.speedY = -22;
        this.midAir = true;
    }
}