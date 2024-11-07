import {SurfaceBlock} from "../../SurfaceBlock.js";
import {BLOCK_SIZE} from "../../Block.js";
import {GameState} from "../../GameState";

export class CloudBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../RevisedTextures/Cloud.png";
    }

    timeout = null;
    window = 0;

    isReactive() {
        return this.timeout == null;
    }

    react() {
        this.timeout = setTimeout(() => {
            this.window = BLOCK_SIZE;
            this.timeout = setTimeout(() => {
                this.window = 2 * BLOCK_SIZE;
                this.timeout = setTimeout(() => {
                    this.window = 3 * BLOCK_SIZE;
                    this.timeout = setTimeout(() => {
                        this.window = 0;
                        this.timeout = null;
                    }, 4000);
                }, 500);
            }, 500);
        }, 500);
    }

    collides(hitbox) {
        if (this.timeout == null) return super.collides(hitbox);
        else return false;
    }

    draw() {
        GameState.ctx.drawImage(CloudBlock.texture, this.window, 0, BLOCK_SIZE, BLOCK_SIZE, this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    }
}