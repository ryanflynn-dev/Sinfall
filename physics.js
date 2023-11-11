export const GRAVITY = 1;
export const FRICTION = 0.9;
export const GROUND = 1040;

export function isColliding(entity1, entity2) {
    return entity1.x < entity2.x + entity2.width &&
           entity1.x + entity1.width > entity2.x &&
           entity1.y < entity2.y + entity2.height &&
           entity1.y + entity1.height > entity2.y;
}

export function checkIfOnPlatform(entity, platforms) {
    entity.onPlatform = false;
    platforms.forEach(platform => {
        if (entity.x < platform.x + platform.width &&
            entity.x + entity.width > platform.x &&
            entity.y + entity.height <= platform.y &&
            entity.y + entity.height + entity.vY > platform.y) {
            entity.y = platform.y - entity.height; 
            entity.vY = 0;
            entity.onPlatform = true;
        }
    });
}

export function collidingWithBoundaries(entity, canvas){
    if (entity.x < 0) {
        entity.vX = 0;
        entity.x = 0;
    }
    if (entity.x > canvas.width - entity.width){
        entity.vX = 0;
        entity.x = canvas.width - entity.width;
    }
}