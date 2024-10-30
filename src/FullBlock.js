import {TerrainBlock} from "./TerrainBlock";
import {BLOCK_SIZE} from "./Block";

export class FullBlock extends TerrainBlock {
    constructor(x, y) {
        super(x, x + BLOCK_SIZE, y, y + BLOCK_SIZE);
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.drawImage(this.texture, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}