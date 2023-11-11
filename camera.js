export class Camera {
    constructor(player, width, height) {
        this.player = player;
        this.width = width;
        this.height = height;
        this.zoom = 1.5;
    }
    update() {
        this.x = -this.player.x + this.width / 2 / this.zoom;
        this.y = -this.player.y + this.height / 2 / this.zoom;

    }
    applyTransformations(context) {
        context.translate(this.x, this.y);
        context.scale(this.zoom, this.zoom);
    }
    resetTransformations(context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
}