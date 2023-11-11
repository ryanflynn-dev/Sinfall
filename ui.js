const HEALTH_BAR_WIDTH = 200;
const HEALTH_BAR_HEIGHT = 20;
const HEALTH_BAR_X = 10;
const HEALTH_BAR_Y = 10;

export function renderUI(context, player) {
    context.fillStyle = 'gray';
    context.fillRect(HEALTH_BAR_X, HEALTH_BAR_Y, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT);

    const healthPercentage = player.health / player.maxHealth;
    context.fillStyle = 'red';
    context.fillRect(HEALTH_BAR_X, HEALTH_BAR_Y, HEALTH_BAR_WIDTH * healthPercentage, HEALTH_BAR_HEIGHT);

    context.fillStyle = 'white';
    context.font = '24px Calibri';
    context.textAlign = 'center';
    context.fillText(`Health: ${Math.round(player.health)}`, HEALTH_BAR_X + HEALTH_BAR_WIDTH / 2, HEALTH_BAR_Y + 7 + HEALTH_BAR_HEIGHT / 2);
}
