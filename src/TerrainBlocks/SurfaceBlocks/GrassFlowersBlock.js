import {SurfaceBlock} from "../../SurfaceBlock.js";
import {BLOCK_SIZE} from "../../Block";
import {GameState} from "../../GameState";

export class GrassFlowersBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/GrassAndFlowers.png";
    }

    draw() {
        GameState.ctx.drawImage(GrassFlowersBlock.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}