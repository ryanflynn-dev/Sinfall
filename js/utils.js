export function collision(object1, object2) {
    let collisions = []
    const horizontalOverlap = object1.x < object2.x + object2.width && object1.x + object1.width > object2.x
    const verticalOverlap = object1.y < object2.y + object2.height && object1.y + object1.height > object2.y
    if (horizontalOverlap) {
      if (object1.y + object1.height >= object2.y && object1.y + object1.height <= object2.y + object2.height && object1.vy >= 0) {
        collisions.push("collisionBottom")
      }
      if (object1.y <= object2.y + object2.height && object1.y >= object2.y && object1.vy <= 0) {
        collisions.push("collisionTop")
      }
    }
    if (verticalOverlap) {
      if (object1.x + object1.width >= object2.x && object1.x + object1.width <= object2.x + object2.width && object1.vx >= 0) {
        collisions.push("collisionLeft")
      }
      if (object1.x >= object2.x && object1.x <= object2.x + object2.width && object1.vx <= 0) {
        collisions.push("collisionRight")
      }
    }
    return collisions
}

export function hit(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }