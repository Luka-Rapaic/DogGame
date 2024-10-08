class animal {
    constructor(width, height, posX, posY) {
        this.width = width;
        this.height = height;
        this.x1 = posX;
        this.y1 = posY;
        this.x2 = posX + width;
        this.y2 = posY + height;
        this.texture = new Image;
    }

    draw() {
        ctx.drawImage(this.texture, this.x1, this.y1, this.width, this.height);
    }
}

class dog extends animal {
    constructor(width, height, posX, posY) {
        super(width, height, posX, posY);
        this.texture.src = 'Textures/Dog.png';
    }

    idle = true;
    midAir = false;
    underground = false;
    facingLeft = true;

    diggingProgress = 0;

    speedX = 0;
    speedY = 0;

    moveRight() {
        this.speedX = 16;
        this.facingLeft = false;
        this.idle = false;
    }

    moveLeft() {
        this.speedX = -16;
        this.facingLeft = true;
        this.idle = false;
    }

    jump() {
        this.speedY = -22;
        this.midAir = true;
    }

    goDown() {
        if (this.underground) {
            let x = Math.floor(this.x1 / BLOCKSIZE);
            let y = Math.floor(this.y1 / BLOCKSIZE) + 1;

            if (map[y][x] === undefined) return;
            if (map[y][x].isDiggable && map[y][x].isDug) {
                map[y-1][x].isOccupied = false;
                map[y][x].isOccupied = true;

                this.y1 = this.y2 = this.y1 + BLOCKSIZE;
                keys.down = false;
            } else if (map[y][x].isDiggable && !map[y][x].isDug) {
                this.diggingProgress++;
                if (this.diggingProgress === 60) {
                    keys.down = false;
                    this.diggingProgress = 0;

                    map[y][x].isDug = true;
                }
            }
        } else {
            let x = this.facingLeft ? Math.floor(this.x1 / BLOCKSIZE) : Math.floor(this.x2 / BLOCKSIZE);
            let y = Math.floor(this.y2 / BLOCKSIZE);

            if (map[y][x] === undefined || map[y][x] === null) return;
            if (map[y][x].isDiggable && map[y][x].isDug) {
                map[y][x].isOccupied = true;

                this.underground = true;
                this.x1 = this.x2 = x * BLOCKSIZE + BLOCKSIZE / 2;
                this.y1 = this.y2 = y * BLOCKSIZE + BLOCKSIZE / 2;

                keys.down = false;
            }
        }
    }

    goUp() {
        if (this.underground) {
            let x = Math.floor(this.x1 / BLOCKSIZE);
            let y = Math.floor(this.y1 / BLOCKSIZE) - 1;

            if (map[y][x] === undefined || map[y][x] === null) {
                map[y + 1][x].isOccupied = false;

                this.x1 = this.x1 - this.width / 2;
                this.x2 = this.x2 + this.width / 2;

                this.y1 = this.y1 - BLOCKSIZE / 2 - this.height;
                this.y2 = this.y2 - BLOCKSIZE / 2;

                this.underground = false;
                keys.jump = false;
            } else if (map[y][x].isDiggable && map[y][x].isDug) {
                map[y + 1][x].isOccupied = false;
                map[y][x].isOccupied = true;

                this.y1 = this.y2 = this.y1 - BLOCKSIZE;
                keys.jump = false;

            } else if (map[y][x].isDiggable && !map[y][x].isDug) {
                this.diggingProgress++;
                if (this.diggingProgress === 60) {
                    keys.up = false;
                    this.diggingProgress = 0;

                    map[y][x].isDug = true;
                }
            }
        }
    }

    goLeft() {
        let x = Math.floor(this.x1 / BLOCKSIZE) - 1;
        let y = Math.floor(this.y1 / BLOCKSIZE);

        if (map[y][x] === undefined || map[y][x] === null) return;
        if (map[y][x].isDiggable && map[y][x].isDug) {
            map[y][x + 1].isOccupied = false;
            map[y][x].isOccupied = true;

            this.x1 = this.x2 = this.x1 - BLOCKSIZE;
            keys.left = false;
        } else if (map[y][x].isDiggable && !map[y][x].isDug) {
            this.diggingProgress++;
            if (this.diggingProgress === 60) {
                keys.left = false;
                this.diggingProgress = 0;

                map[y][x].isDug = true;
            }
        }
    }

    goRight() {
        let x = Math.floor(this.x1 / BLOCKSIZE) + 1;
        let y = Math.floor(this.y1 / BLOCKSIZE);

        if (map[y][x] === undefined || map[y][x] === null) return;
        if (map[y][x].isDiggable && map[y][x].isDug) {
            map[y][x - 1].isOccupied = false;
            map[y][x].isOccupied = true;

            this.x1 = this.x2 = this.x1 + BLOCKSIZE;
            keys.right = false;
        } else if (map[y][x].isDiggable && !map[y][x].isDug) {
            this.diggingProgress++;
            if (this.diggingProgress === 60) {
                keys.right = false;
                this.diggingProgress = 0;

                map[y][x].isDug = true;
            }
        }
    }

    dig() {
        if (!this.midAir) {
            this.speedX = 0;
            let x;
            if (this.facingLeft) {
                x = Math.floor(this.x1 / BLOCKSIZE);
            } else {
                x = Math.floor(this.x2 / BLOCKSIZE);
            }
            let y = Math.floor(this.y2 / BLOCKSIZE);

            if (map[y][x].isDiggable && !map[y][x].isDug) {
                if (frame < 7) {
                    ctx.drawImage(sandParticlesTexture, 0, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 15) {
                    ctx.drawImage(sandParticlesTexture, 150, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 22) {
                    ctx.drawImage(sandParticlesTexture, 300, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 30) {
                    ctx.drawImage(sandParticlesTexture, 450, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 37) {
                    ctx.drawImage(sandParticlesTexture, 0, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 45) {
                    ctx.drawImage(sandParticlesTexture, 150, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else if (frame < 52) {
                    ctx.drawImage(sandParticlesTexture, 300, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                } else {
                    ctx.drawImage(sandParticlesTexture, 450, 0, 150, 150, x*BLOCKSIZE, (y-1)*BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
                }
                this.diggingProgress++;
                if (this.diggingProgress === 60) {
                    map[y][x].isDug = true;
                }
            }
        }
    }

    newPosition() {
        this.x1 += this.speedX;
        this.x2 += this.speedX;

        for (let block of terrainblocks) {
            if (this.check_collision(block)) {
                if (block instanceof ActiveTerrain) block.activate();
                if (this.speedX > 0) {
                    this.x2 = block.x1;
                    this.x1 = block.x1 - this.width;
                } else {
                    this.x1 = block.x2;
                    this.x2 = block.x2 + this.width;
                }
                this.speedX = 0;
                break;
            }
        }

        this.y1 += this.speedY;
        this.y2 += this.speedY;

        for (let block of terrainblocks) {
            if (this.check_collision(block)) {
                if (block instanceof ActiveTerrain) block.activate();
                if (this.speedY > 0) {
                    this.y2 = block.y1;
                    this.y1 = block.y1 - this.height;
                    this.midAir = false;
                } else {
                    this.y1 = block.y2;
                    this.y2 = block.y2 + this.height;
                }
                this.speedY = 0;
                break;
            }
        }
    }

    update() {
        if (keys.down) this.goDown();

        if (!this.underground) {
            if (keys.left) this.moveLeft();
            else if (keys.right) this.moveRight();
            else {
                this.speedX = 0;
                this.idle = true;
            }

            if (keys.dig) this.dig();
            else this.diggingProgress = 0;

            if (keys.jump && !this.midAir) this.jump();
            else {
                this.speedY += 1;
                this.midAir = true;
            }

            this.newPosition();
        } else {
            if (keys.jump) this.goUp();
            if (keys.left) this.goLeft();
            if (keys.right) this.goRight();
        }
    }

    check_collision(block) {
        if (!block.solid) return false;
        let isPosX = Math.min(this.x2, block.x2) > Math.max(this.x1, block.x1);
        let isPosY = Math.min(this.y2, block.y2) > Math.max(this.y1, block.y1);
        return isPosX && isPosY;
    }

    kill() {}

    draw() {
        if (this.underground) return;
        if (this.midAir) {
            if (this.facingLeft) {
                if (frame < 15) {
                    ctx.drawImage(this.texture, 18450, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else if (frame < 30) {
                    ctx.drawImage(this.texture, 19600, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else if (frame < 45) {
                    ctx.drawImage(this.texture, 20750, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else {
                    ctx.drawImage(this.texture, 21900, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                }
            } else {
                if (frame < 15) {
                    ctx.drawImage(this.texture, 23050, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else if (frame < 30) {
                    ctx.drawImage(this.texture, 24200, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else if (frame < 45) {
                    ctx.drawImage(this.texture, 25350, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                } else {
                    ctx.drawImage(this.texture, 26500, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                }
            }
        } else {
            if (this.idle) {
                if (this.facingLeft) {
                    if (frame < 15) {
                        ctx.drawImage(this.texture, 50, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 30) {
                        ctx.drawImage(this.texture, 1200, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 45) {
                        ctx.drawImage(this.texture, 2350, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else {
                        ctx.drawImage(this.texture, 3500, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    }
                } else {
                    if (frame < 15) {
                        ctx.drawImage(this.texture, 4650, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 30) {
                        ctx.drawImage(this.texture, 5800, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 45) {
                        ctx.drawImage(this.texture, 6950, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else {
                        ctx.drawImage(this.texture, 8100, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    }
                }
            } else {
                if (this.facingLeft) {
                    if (frame < 15) {
                        ctx.drawImage(this.texture, 9250, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 30) {
                        ctx.drawImage(this.texture, 10400, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 45) {
                        ctx.drawImage(this.texture, 11550, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else {
                        ctx.drawImage(this.texture, 12700, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    }
                } else {
                    if (frame < 15) {
                        ctx.drawImage(this.texture, 13850, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 30) {
                        ctx.drawImage(this.texture, 15000, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else if (frame < 45) {
                        ctx.drawImage(this.texture, 16150, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    } else {
                        ctx.drawImage(this.texture, 17300, 200, 1050, 800, this.x1, this.y1, this.width, this.height);
                    }
                }
            }
        }
    }
}

class Fish extends animal {
    constructor(posX, posY) {
        super(FISHWIDTH, FISHHEIGHT, posX, posY);
        this.tx1 = posX - FISHTRIGGERRANGEWIDTH;
        this.tx2 = posX + FISHTRIGGERRANGEWIDTH;
        this.ty1 = posY - FISHTRIGGERRANGEHEIGHT;
        this.ty2 = posY;

        this.speedY = 0;
        this.active = false;
        this.cooldown = false;
        this.sy1 = this.y1;
        this.sy2 = this.y2;
    }

    texture = piranhaTexture;

    trigger(player) {
        let isPosX = Math.min(this.tx2, player.x2) > Math.max(this.tx1, player.x1);
        let isPosY = Math.min(this.ty2, player.y2) > Math.max(this.ty1, player.y1);
        if (isPosX && isPosY) {
            this.speedY = -22;
            this.active = true;
        }
    }

    update(player) {
        if (this.active) {
            this.y1 += this.speedY;
            this.y2 += this.speedY;

            if (this.y1 >= this.sy1) {
                this.y1 = this.sy1;
                this.y2 = this.sy2;
                this.speedY = 0;
                this.active = false;
                this.cooldown = true;
                setTimeout(() => {this.cooldown = false}, 1000);
                return;
            }

            this.attack(player);
            this.speedY += 1;
        } else if (!this.cooldown) {
            this.trigger(player);
        }
    }

    attack(player) {
        let isPosX = Math.min(this.x2, player.x2) > Math.max(this.x1, player.x1);
        let isPosY = Math.min(this.y2, player.y2) > Math.max(this.y1, player.y1);
        if (isPosX && isPosY) player.kill();
    }

    draw() {
        if (!this.active) return;

        if (this.speedY <= 0) ctx.drawImage(this.texture, 0, 0, 1040, 1280, this.x1, this.y1, this.width, this.height);
        else ctx.drawImage(this.texture, 1041, 0, 1040, 1280, this.x1, this.y1, this.width, this.height);
    }
}

class Vegetation {
    constructor(posX, posY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }

    isDiggable = false;
    solid = false;
    texture = undefined;

    draw() {
        ctx.drawImage(this.texture, this.posX, this.posY, this.width, this.height);
    }
}

class Flower1 extends Vegetation {
    constructor(posX, posY) {
        super(posX, posY, BLOCKSIZE, BLOCKSIZE);
    }

    texture = flower1Texture;
}

class Flower2 extends Vegetation {
    constructor(posX, posY) {
        super(posX, posY, BLOCKSIZE, BLOCKSIZE);
    }

    texture = flower2Texture;
}

class Flower3 extends Vegetation {
    constructor(posX, posY) {
        super(posX, posY, BLOCKSIZE, BLOCKSIZE);
    }

    texture = flower3Texture;
}

class terrain {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.x1 = posX + BLOCKOFFSET;
        this.y1 = posY + BLOCKOFFSET;
        this.x2 = posX + BLOCKSIZE;
        this.y2 = posY + BLOCKSIZE;
    }

    isDiggable = false;
    solid = true;
    texture = undefined;
    draw() {
        ctx.drawImage(this.texture, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
    }
}

class grass extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = grassTexture;
}

class grassAndFlowers extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = grassWithFlowersTexture;
}

class grassPath extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = grassPathTexture;
}

class stonePath extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = stonePathTexture;
}

class dirt extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = dirtTexture;
}

class Sand extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    isDiggable = true;
    isDug = false;
    isOccupied = false;

    texture = sandTexture;

    draw() {
        if (!this.isDug) ctx.drawImage(this.texture, 0, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        else if (!this.isOccupied) ctx.drawImage(this.texture, 1200, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        else ctx.drawImage(this.texture, 2400, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
    }
}

class sandDeep extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    isDiggable = true;
    isDug = false;
    isOccupied = false;

    texture = sandDeepTexture;

    draw() {
        if (!this.isDug) ctx.drawImage(this.texture, 0, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        else if (!this.isOccupied) ctx.drawImage(this.texture, 1200, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        else ctx.drawImage(this.texture, 2400, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
    }
}

class water extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    texture = waterTexture;

    draw() {
        if (frame < 15) {
            ctx.drawImage(this.texture, 0, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        } else if (frame < 30) {
            ctx.drawImage(this.texture, 1200, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        } else if (frame < 45) {
            ctx.drawImage(this.texture, 2400, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        } else {
            ctx.drawImage(this.texture, 3600, 0, 1200, 1200, this.posX, this.posY, BLOCKSIZE, BLOCKSIZE);
        }
    }
}



class ActiveTerrain extends terrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    activate() {}

    static blockList = [];
}
class Cloud extends ActiveTerrain {
    constructor(posX, posY) {
        super(posX, posY);
    }

    active = false;
    frame = 0;
    texture = cloudTexture;

    activate() {
        if (!this.active) {
            this.active = true;
            Cloud.blockList.push(this);
        }
    }

    update() {
        this.frame++;
        if (this.frame === 60) {
            this.solid = false;
            Cloud.blockList.splice(Cloud.blockList.indexOf(this), 1);
            setTimeout(() => {
                this.solid = true;
                this.active = false;
                this.frame = 0;
                }, 4000);
        }
    }

    draw() {
        if (this.frame < 20) ctx.drawImage(this.texture, 0, 0, 1200, 1200, this.x1, this.y1, BLOCKSIZE, BLOCKSIZE);
        else if (this.frame < 40) ctx.drawImage(this.texture, 1200, 0, 1200, 1200, this.x1, this.y1, BLOCKSIZE, BLOCKSIZE);
        else if (this.frame < 60) ctx.drawImage(this.texture, 2400, 0, 1200, 1200, this.x1, this.y1, BLOCKSIZE, BLOCKSIZE);
    }
}

class Collectible {
    constructor(x, y, width, height, radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.cx = x + width/2;
        this.cy = y + height/2;
        this.r = radius;

        Collectible.instanceList.push(this);
    }

    texture = undefined;

    draw() {
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    }

    canCollect(player) {
        let closestX = AMath.clamp(this.cx, player.x1, player.x2);
        let closestY = AMath.clamp(this.cy, player.y1, player.y2);

        return Math.pow(this.cx - closestX, 2) + Math.pow(this.cy - closestY, 2) < Math.pow(this.r, 2);
    }

    collect(player) {
        if (this.canCollect(player)) {
            Collectible.instanceList.splice(Collectible.instanceList.indexOf(this), 1);
            return true;
        }
        return false;
    }

    static instanceList = [];
}

class Ribbon extends Collectible {
    constructor(x, y) {
        super(x, y, RIBBONWIDTH, RIBBONHEIGHT, RIBBONRADIUS);
    }

    texture = ribbonTexture;
}

class AMath {
    static clamp(value, min, max) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }
}
class AGeometry {
    static distancePTP(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}

function loadMap(mapPlot) {
    // const response = await fetch('./'+mapName);
    // const mapPlot = await response.json();

    let map = [];
    for (let i = 0; i < mapPlot.length; i++) {
        let mapRow = [];
        for (let j = 0; j < mapPlot[i].length; j++) {
            try {
                let block;
                switch(mapPlot[i][j]) {
                    case 'grass':
                        block = new grass(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'flowers':
                        block = new grassAndFlowers(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'dirtPath':
                        block = new grassPath(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'stonePath':
                        block = new stonePath(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'dirt':
                        block = new dirt(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'sand':
                        block = new Sand(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'sandDeep':
                        block = new sandDeep(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'waterFall':
                        block = new water(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'cloud':
                        block = new Cloud(j * BLOCKSIZE, i * BLOCKSIZE);
                        break;
                    case 'flower1':
                        block = new Flower1(j * BLOCKSIZE, i*BLOCKSIZE);
                        break;
                    case 'flower2':
                        block = new Flower2(j * BLOCKSIZE, i*BLOCKSIZE);
                        break;
                    case 'flower3':
                        block = new Flower3(j * BLOCKSIZE, i*BLOCKSIZE);
                        break;
                    case '':
                        block = null;
                }
                if (block !== undefined) {
                    mapRow.push(block);
                }
            }
            catch (err) {
                mapRow.push();
            }
        }
        map.push(mapRow);
    }
    console.log(map);
    return map;
}

function trackObjectStrict(object) {
    let x = Math.floor((object.x1 + object.x2) / 2);
    let y = Math.floor((object.y1 + object.y2) / 2);

    ctx.translate(originX - (x - 600), originY - (y - 400));
    originX = x - 600;
    originY = y - 400;
}

function trackObject(object) {
    let x = Math.floor((object.x1 + object.x2) / 2);
    let y = Math.floor((object.y1 + object.y2) / 2);

    if (x < originX + 450) {
        ctx.translate(originX - (x - 450), 0);
        originX = x - 450;
    } else if (x > originX + 750) {
        ctx.translate(originX - (x - 750), 0);
        originX = x - 750;
    }

    if (y < originY + 200) {
        ctx.translate(0, originY - (y - 200));
        originY = y - 200;
    } else if (y > originY + 600) {
        ctx.translate(0, originY - (y - 600));
        originY = y - 600;
    }
}

function loadTerrain(map, object) {
    let x = Math.floor((object.x1 + object.x2) * 0.5 / BLOCKSIZE);
    let y = Math.floor((object.y1 + object.y2) * 0.5 / BLOCKSIZE);

    let startX = x - LOADAMOUNTX;
    let endX = x + LOADAMOUNTX;
    let startY = y - LOADAMOUNTY;
    let endY = y + LOADAMOUNTY;

    // console.log('X: ' + x + '\nY: ' + y + '\nstartX: ' + startX + '\nendX: ' + endX);

    let terrain = [];
    for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
            try {
                if (map[i][j] !== undefined && map[i][j] !== null) terrain.push(map[i][j]);
            } catch (e) {}
        }
    }

    return terrain;
}

document.addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 37:
            keys['left'] = true;
            break;
        case 38:
            keys['jump'] = true;
            break;
        case 39:
            keys['right'] = true;
            break;
        case 40:
            keys['down'] = true;
            break;
        case 86:
            keys['dig'] = true;
            break;
        case 67:
            strictCamera = !strictCamera;
    }
})

document.addEventListener('keyup', (event) => {
    switch(event.keyCode) {
        case 37:
            keys['left'] = false;
            break;
        case 38:
            keys['jump'] = false;
            break;
        case 39:
            keys['right'] = false;
            break;
        case 40:
            keys['down'] = false;
            break;
        case 86:
            keys['dig'] = false;
            break;
    }
})

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d', {alpha: false});
const CTXWIDTH = 1200
const CTXHEIGHT = 800;
console.log(CTXWIDTH, CTXHEIGHT);

const BLOCKSIZE = 75;
const BLOCKOFFSET = BLOCKSIZE / 15;
const LOADAMOUNTX = Math.ceil(CTXWIDTH / BLOCKSIZE * 0.5) + 3;
const LOADAMOUNTY = Math.ceil(CTXHEIGHT / BLOCKSIZE * 0.5) + 3;

const RIBBONHEIGHT = 52;
const RIBBONWIDTH = 60;
const RIBBONRADIUS = 50;

const FISHTRIGGERRANGEWIDTH = 100;
const FISHTRIGGERRANGEHEIGHT = 200;
const FISHHEIGHT = 48;
const FISHWIDTH = 39;
const FISHRADIUS = 24;

let frame = 0;
let originX = 0;
let originY = 0;
let strictCamera = true;

let keys = {
    'left': false,
    'right': false,
    'jump': false,
    'down': false,
    'dig': false
}


let dirtTexture = new Image;
dirtTexture.src = 'Textures/Dirt.png';
let grassTexture = new Image;
grassTexture.src = 'Textures/Grass.png';
let grassWithFlowersTexture = new Image;
grassWithFlowersTexture.src = 'Textures/GrassAndFlowers.png';
let stonePathTexture = new Image;
stonePathTexture.src = 'Textures/StonePath.png';
let waterTexture = new Image;
waterTexture.src = 'Textures/Water.png';
let sandTexture = new Image;
sandTexture.src = 'Textures/Sand.png';
let sandDeepTexture = new Image;
sandDeepTexture.src = 'Textures/SandDeep.png';
let sandParticlesTexture = new Image;
sandParticlesTexture.src = 'Textures/SandParticles.png';
let cloudTexture = new Image;
cloudTexture.src = 'Textures/Cloud.png';

let ribbonTexture = new Image;
ribbonTexture.src = 'Textures/Ribbon.png';

let piranhaTexture = new Image;
piranhaTexture.src = 'Textures/Piranha.png';

let flower1Texture = new Image;
flower1Texture.src = 'Textures/Flower1.png';
let flower2Texture = new Image;
flower2Texture.src = 'Textures/Flower2.png';
let flower3Texture = new Image;
flower3Texture.src = 'Textures/Flower3.png';

let mapPlot = [
    [],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'grass', 'sand', 'sand', 'grass'],
    ['', '', 'cloud', 'cloud', 'cloud', '', '', '', '', '', 'grass', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'dirt', 'sandDeep', 'sandDeep', 'dirt'],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'flower1', '', 'flower2', 'flower3', '', '', '', '', '', '', '', '', '', '', '', '', 'dirt', 'sandDeep', 'sandDeep', 'dirt'],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'grass', 'grass', 'stonePath', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'sand', 'sand', 'waterFall', 'waterFall', 'sand', 'sand', 'grass', 'grass', 'dirt', 'sandDeep', 'sandDeep', 'dirt'],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'sandDeep', 'dirt'],
    ['','','grass', 'grass', 'grass', 'flowers', 'grass', 'grass', 'grass', 'flowers', 'waterFall', 'waterFall', 'grass'],
    ['','','dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt'],
    ['','','dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt'],
    ['','','dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt'],
    ['','','dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt']];

let map = loadMap(mapPlot);


let Dog = new dog(105, 80, 547.5, 360);
let terrainblocks = [];
let ribbon = new Ribbon(1282.5, 245);
let piranha = new Fish(1968, 313.5);
// for (let i = 0; i < 5; i++) {
//     let grassPath1 = new grassPath(100+BLOCKSIZE*i, 500);
//     terrainblocks.push(grassPath1);
// }
// let flowers = new grassAndFlowers(100+4*BLOCKSIZE, 500);
// let grass1 = new grass(100+5*BLOCKSIZE, 500);
// let stone1 = new stonePath(100+6*BLOCKSIZE, 500);
// let stone2 = new stonePath(100+7*BLOCKSIZE, 500);
// let water1 = new water(100+8*BLOCKSIZE, 500);
// let water2 = new water(100+9*BLOCKSIZE, 500);
// let flowers2 = new grassAndFlowers(100+10*BLOCKSIZE, 500);
// terrainblocks.push(flowers, grass1, stone1, stone2, water1, water2, flowers2);
// loadMap('Map1.json');

setInterval(function() {
    frame = (frame + 1) % 60;
    ctx.fillRect(originX, originY, 1200, 800);
    ctx.fillStyle = 'rgba(200, 200, 255, 0.6)';
    terrainblocks = loadTerrain(map, Dog);
    piranha.update(Dog);
    piranha.draw();
    for (let block of terrainblocks) {
        block.draw();
    }
    for (let activeBlock of ActiveTerrain.blockList) {
        activeBlock.update();
    }
    for (let collectible of Collectible.instanceList) {
        collectible.draw();
        collectible.collect(Dog);
    }
    Dog.update();
    if (strictCamera) {
        trackObjectStrict(Dog);
    } else {
        trackObject(Dog);
    }
    Dog.draw();
}, 16.66);