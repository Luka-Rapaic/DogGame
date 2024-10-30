import {FullBlock} from "../../FullBlock";
import {BLOCK_SIZE} from "../../Block";

export class SandDeepBlock extends FullBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../RevisedTextures/SandDeep.png";
    }

    isDug = false;
    occupant = null;

    isDiggable() {
        return !this.isDug;
    }

    isBurrowable() {
        return this.isDug;
    }

    draw() {
        if (!this.isDug) ctx.drawImage(this.texture, 0, 0, BLOCK_SIZE, BLOCK_SIZE, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
        else ctx.drawImage(this.texture, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
        if (this.occupant != null) this.occupant.draw();
    }
}