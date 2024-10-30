import {TerrainBlock} from "./TerrainBlock";
import {BLOCK_OFFSET, BLOCK_SIZE} from "./Block";

export class SurfaceBlock extends TerrainBlock {
    constructor(x, y) {
        super(x, x + BLOCK_SIZE, y + BLOCK_OFFSET, y + BLOCK_SIZE);
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.drawImage(this.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}