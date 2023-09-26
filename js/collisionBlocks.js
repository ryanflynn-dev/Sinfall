export class CollisionBlock {
  constructor({ x, y, ctx, width = 36, height = 36 }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = ctx;
  }

  
    
  draw() {
    this.context.fillStyle = 'blue'
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }
  
  update() {
    this.draw()
  }
}