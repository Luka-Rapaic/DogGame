import {SurfaceBlock} from "../../SurfaceBlock.js";
import {BLOCK_SIZE} from "../../Block.js";
import {GameState} from "../../GameState";

export class GrassBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y)
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/Grass.png";
    }

    draw() {
        GameState.ctx.drawImage(GrassBlock.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}