export class DecorativeBlock {
    isDiggable() {
        return false;
    }

    isBurrowable() {
        return false;
    }

    isActive() {
        return false;
    }

    isReactive() {
        return false;
    }

    collides(hitbox) {
        return false;
    }
}