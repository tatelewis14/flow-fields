export class Line {
    constructor(x, y, vx, vy, effect) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.thickness = 2
        this.history = [{x: this.x, y: this.y}];
        this.maxLength = Math.floor(Math.random() *200 + 10);
        this.angle = 0;
        this.effect = effect;
        this.speedMultiplier = Math.random() * 2;
        this.timer = this.maxLength * 2
}
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y)
        for(let i = 0; i<this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.strokeStyle = 'white'
        ctx.lineWidth = this.thickness
        ctx.stroke()
    }
    update() {
        this.timer--;
        if(this.timer >=1) {
            let x = Math.floor(this.x/this.effect.cellSize);
            let y = Math.floor(this.y/this.effect.cellSize);
            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index]
            
            this.vx = Math.cos(this.angle);
            this.vy = Math.sin(this.angle)
            
            this.x+=this.vx * this.speedMultiplier; 
            this.y+=this.vy * this.speedMultiplier
            this.history.push({x:this.x, y:this.y})
            if(this.history.length>this.maxLength) {
                this.history.shift()        
            }
        } else if(this.history.length > 1){ 
            this.history.shift()
        } else {
            this.reset()
        }
        

    }
    reset() {
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height
        this.history = [{x:this.x, y:this.y}]
        this.timer = this.maxLength * 2
    }
}