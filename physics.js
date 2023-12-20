export const GRAVITY = 1;
export const FRICTION = 0.65;
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

export function handleWallCollisions(entity, walls) {
    let horizontalCollision = false;
    

    walls.forEach(wall => {
        // Check horizontal collision
        if (entity.y + entity.height > wall.y && entity.y < wall.y + wall.height) {
            if ((entity.x + entity.width > wall.x && entity.x < wall.x + wall.width / 2) ||
                (entity.x < wall.x + wall.width && entity.x + entity.width > wall.x + wall.width / 2)) {
                horizontalCollision = true;
            }
            return;
        }
    });
    walls.forEach(wall => {
        if (horizontalCollision) {
            // Collision from the left
            if (entity.x + entity.width > wall.x && entity.x < wall.x + wall.width / 2) {
                entity.x = wall.x - entity.width;
                entity.vX = 0;
                horizontalCollision = false;

            }
            // Collision from the right
            else if (entity.x < wall.x + wall.width && entity.x + entity.width > wall.x + wall.width / 2) {
                entity.x = wall.x + wall.width;
                entity.vX = 0;
                horizontalCollision = false;
            }
        }
    })
}

export function handleTopCollisions(entity, tops) {
    let verticalCollision = false;
    tops.forEach(top => {
        // Check vertical collision
        if (entity.x + entity.width > top.x && entity.x < top.x + top.width) {
            if ((entity.y + entity.height > top.y && entity.y < top.y + top.height / 2) ||
                (entity.y < top.y + top.height && entity.y + entity.height > top.y + top.height / 2)) {
                verticalCollision = true;
            }
        }
    })
    tops.forEach(top => {
        if (verticalCollision) {
            // Collition from the top
            if (entity.y + entity.height > top.y && entity.y < top.y + top.height / 2) {
                entity.y = top.y - entity.height;
                entity.vY = 0;
                verticalCollision = false;
                entity.onPlatform = true;
            }
        }
    })
}

export function handleBottomCollisions(entity, bottoms) {
    let verticalCollision = false;

    bottoms.forEach(bottom => {
        // Check vertical collision
        if (entity.x + entity.width > bottom.x && entity.x < bottom.x + bottom.width) {
            if ((entity.y + entity.height > bottom.y && entity.y < bottom.y + bottom.height / 2) ||
                (entity.y < bottom.y + bottom.height && entity.y + entity.height > bottom.y + bottom.height / 2)) {
                verticalCollision = true;
            }
            return;
        }
    })
    bottoms.forEach(bottom => {
        if (verticalCollision) {
        // Collition from the bottom
            if (entity.y < bottom.y + bottom.height && entity.y + entity.height > bottom.y + bottom.height / 2) {
                entity.y = bottom.y + bottom.height;
                entity.vY = 0;
                verticalCollision = false;
            }
        }
    })
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