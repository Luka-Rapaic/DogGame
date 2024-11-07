import {SurfaceBlock} from "../../SurfaceBlock.js";
import {BLOCK_SIZE} from "../../Block";
import {GameState} from "../../GameState";

export class StonePathBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/StonePath.png";
    }

    draw() {
        GameState.ctx.drawImage(StonePathBlock.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}