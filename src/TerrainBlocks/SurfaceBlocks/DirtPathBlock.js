import {SurfaceBlock} from "../../SurfaceBlock.js";
import {BLOCK_SIZE} from "../../Block";
import {GameState} from "../../GameState";

export class DirtPathBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/DirtPath.png"
    }

    draw() {
        GameState.ctx.drawImage(DirtPathBlock.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}