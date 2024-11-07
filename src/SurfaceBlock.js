import {TerrainBlock} from "./TerrainBlock.js";
import {BLOCK_OFFSET, BLOCK_SIZE} from "./Block.js";

export class SurfaceBlock extends TerrainBlock {
    constructor(x, y) {
        super(x, x + BLOCK_SIZE, y + BLOCK_OFFSET, y + BLOCK_SIZE);
        this.x = x;
        this.y = y;
    }
}