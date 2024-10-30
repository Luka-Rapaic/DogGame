import {FullBlock} from "../../FullBlock";

export class DirtBlock extends FullBlock {
    constructor(x, y) {
        super(x, y);
    }

    static {
        this.texture = new Image();
        this.texture.src = "../RevisedTextures/Dirt.png";
    }
}