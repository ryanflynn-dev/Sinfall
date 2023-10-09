export class CollisionBlock {
  constructor({ x, y, ctx, width, height}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.context = ctx
  }
  draw() {
    this.context.fillStyle = 'grey'
    this.context.fillRect(this.x, this.y, this.width, this.height)
  }  
  update() {
    this.draw()
  }
}