export class CollisionBlock {
  constructor({ x, y, width, height, ctx}) {
    this.image = document.getElementById('platform')
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.ctx = ctx
    this.frameX = 0
    this.frameY = 0
  }
  draw() {
    this.ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }  
  update() {
    this.draw()
  }
}