export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (
                (
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    //Listen for a keypress event for the left arrow key.
                    e.key === 'ArrowLeft' ||
                    // Listen for a keypress event for the right arrow key. 
                    e.key === 'ArrowRight' ||
                    // Listen for a keypress event for the jump key (e.g., space).
                    e.key === ' '
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
        })

        window.addEventListener('keyup', e => {
            if (
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp'||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' '){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        })

    }
}