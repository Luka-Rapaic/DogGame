import {TerrainBlock} from "./TerrainBlock.js";
import {BLOCK_SIZE} from "./Block.js";

export class FullBlock extends TerrainBlock {
    constructor(x, y) {
        super(x, x + BLOCK_SIZE, y, y + BLOCK_SIZE);
        this.x = x;
        this.y = y;
    }
}