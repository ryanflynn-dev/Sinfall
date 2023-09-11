export class CollisionBlock {
    constructor(x, y, width = 36, height = 36) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }
  
    draw(context) {
      context.fillStyle = 'blue'
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  
    update() {
    }
  }