const inputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    attack: false,
    shoot: false
}

function handleKeydown(event) {
    switch (event.code) {
        case 'KeyA':
            inputState.left = true;
            break;
        case 'KeyD':
            inputState.right = true;
            break;
        case 'KeyW':
            inputState.up = true;
            break;
        case 'KeyS':
            inputState.down = true;
            break;
        case 'Comma':
            inputState.jump = true;
            break;
        case 'Period':
            inputState.attack = true;
            break;
        case 'Slash':
            inputState.shoot = true;
           break;
        case 'Semicolon':
            inputState.dash = true;
           break;
    }
}

function handleKeyup(event) {
    switch (event.code) {
        case 'KeyA':
            inputState.left = false;
            break;
        case 'KeyD':
            inputState.right = false;
            break;
        case 'KeyW':
            inputState.up = false;
            break;
        case 'KeyS':
            inputState.down = false;
            break;
        case 'Comma':
            inputState.jump = false;
            break;
        case 'Period':
            inputState.attack = false;
            break;
        case 'Slash':
            inputState.shoot = false;
            break;
        case 'Semicolon':
            inputState.dash = false;
           break;
    }
}

export function initializeInputHandlers() {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
}

export function getInputState() {
    return inputState;
}