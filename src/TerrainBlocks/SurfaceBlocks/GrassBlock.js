import {SurfaceBlock} from "../../SurfaceBlock";

export class GrassBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y)
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/Grass.png";
    }
}