import {SurfaceBlock} from "../../SurfaceBlock";

export class GrassFlowersBlock extends SurfaceBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../Textures/GrassAndFlowers.png";
    }
}