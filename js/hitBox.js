export class MeleeHitBox {
  constructor(x, y, direction, width, height, ctx) {
    this.imageRight = document.getElementById('melee-right')
    this.imageLeft = document.getElementById('melee-left')
    this.x = x
    this.y = y
    this.direction = direction
    this.width = width
    this.height = height
    this.ctx = ctx
    this.frameX = 0      
    this.frameY = 0
  }
  draw() {
    if (this.direction === "right"){
      this.ctx.drawImage(this.imageRight, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    if (this.direction === "left"){
      this.ctx.drawImage(this.imageLeft, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
  }  
  update() {
    this.draw()
  }
}