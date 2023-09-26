export function collision(object1, object2) {
    let collisions = [];
  
    // Check for horizontal overlap
    const horizontalOverlap = object1.x < object2.x + object2.width && object1.x + object1.width > object2.x;
  
    // Check for vertical overlap
    const verticalOverlap = object1.y < object2.y + object2.height && object1.y + object1.height > object2.y;
  
    if (horizontalOverlap) {
      if (object1.y + object1.height >= object2.y && object1.y + object1.height <= object2.y + object2.height && object1.vy >= 0) {
        collisions.push("collisionBottom");
      }
      // Corrected the condition for collisionTop
      if (object1.y <= object2.y + object2.height && object1.y >= object2.y && object1.vy <= 0) {
        collisions.push("collisionTop");
      }
    }
  
    if (verticalOverlap) {
      // Additional check to see if object1 is actually to the left of object2
      if (object1.x + object1.width >= object2.x && object1.x + object1.width <= object2.x + object2.width && object1.vx >= 0) {
        collisions.push("collisionLeft");
      }
      // Additional check to see if object1 is actually to the right of object2
      if (object1.x >= object2.x && object1.x <= object2.x + object2.width && object1.vx <= 0) {
        collisions.push("collisionRight");
      }
    }
  
    return collisions;
}
