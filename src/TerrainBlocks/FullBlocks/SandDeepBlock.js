import {FullBlock} from "../../FullBlock.js";
import {BLOCK_SIZE} from "../../Block.js";
import {GameState} from "../../GameState";

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
        if (!this.isDug) GameState.ctx.drawImage(SandDeepBlock.texture, 0, 0, BLOCK_SIZE, BLOCK_SIZE, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
        else GameState.ctx.drawImage(SandDeepBlock.texture, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
        if (this.occupant != null) this.occupant.draw();
    }
}