import {FullBlock} from "../../FullBlock.js";
import {BLOCK_SIZE} from "../../Block";
import {GameState} from "../../GameState";

export class DirtBlock extends FullBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/Dirt.png";
    }

    draw() {
        GameState.ctx.drawImage(DirtBlock.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}