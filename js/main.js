import { hit } from "./utils.js"
import { Player } from "./player.js"
import { InputHandler } from "./input.js"
import { CollisionBlock } from "./collisionBlocks.js"
import { floorCollisions } from "../data/collisions.js"
import { Enemy } from "./enemy.js"

window.addEventListener("load", function(){
    const canvas = document.getElementById("game")
    const ctx = canvas.getContext("2d")
    canvas.width = 360 * 3
    canvas.height = 360 * 3
    class Game{
        constructor(width, height){
            this.width = width
            this.height = height
            this.input = new InputHandler()
            this.collisionBlocks = []
            this.cameraZoom = 1.5
            const floorCollisions2D = []
            for (let i = 0; i < floorCollisions.length; i += 30) {
                floorCollisions2D.push(floorCollisions.slice(i, i + 30))
            }
            floorCollisions2D.forEach((row, y) => {
                row.forEach((symbol, x) => {
                    if (symbol === 202) {
                    this.collisionBlocks.push(
                        new CollisionBlock({
                            x: x * 36,
                            y: y * 36,
                            width: 36,
                            height: 36,
                            ctx
                        })
                    )}
                })
            })
            this.player = new Player(50, this.height - 500, this)
            this.enemy = new Enemy(50, this.height - 500, this)
            this.enemy2 = new Enemy(100, this.height - 500, this)
        }
        update(){
            const enemy = this.enemy
            const enemy2 = this.enemy2
            const player = this.player
            player.update(this.input.keys, )
            if (enemy){
                enemy.update()
                if (hit(player.attackBox, enemy) && enemy.invincible === false && !player.hitRegistered){
                    player.hitRegistered = true;
                    if (enemy.health > 0) {
                        this.enemyHit()
                        setTimeout(() => {
                            this.enemy.invincible = false
                        }, 100)
                    } else {
                        this.enemy = null
                    }
                }
                if (!player.attacking) {
                    player.hitRegistered = false
                }
            }
            if (this.enemy === null){
                this.enemy = new Enemy(50, this.height - 500, this)
            }
        }
        draw(ctx){
            ctx.clearRect(0, 0, this.width, this.height)
            ctx.save()
            ctx.scale(this.cameraZoom, this.cameraZoom)
            ctx.translate(-this.player.x + this.width / (2 * this.cameraZoom), -this.player.y + this.height / (1.4 * this.cameraZoom))
            ctx.fillStyle = 'maroon'
            ctx.fillRect(this.player.x - this.width / (2 * this.cameraZoom), this.player.y - this.height / (1.4 * this.cameraZoom), this.width / this.cameraZoom, this.height / this.cameraZoom)
            this.collisionBlocks.forEach((collisionBlock) => {
                collisionBlock.update()
            })
            this.player.draw(ctx)
            if (this.enemy){
                this.enemy.draw(ctx)
            }
            ctx.restore()
        }
        enemyHit(){
            const enemy = this.enemy
            const player = this.player
            player.attacking = false
            enemy.invincible = true
            enemy.health -= 1
          }
      }
    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    function animate(timeStamp){

        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})