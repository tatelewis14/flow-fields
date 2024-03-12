export class Particle {
    constructor(x,y,vx,vy,radius) {
        this.x = x;
        this.y= y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        }
    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2, false)
        ctx.fill()
    }
    update() {
        if(this.x+this.radius > innerWidth) {
            this.vx = -this.vx
        }
        if(this.y+this.radius > innerHeight) {
            this.vy = -this.vy
        }
        if(this.y-this.radius<0) {
            this.vy = -this.vy
        }
        if(this.x-this.radius<0) {
            this.vx = -this.vx
        }
        
        
        this.x +=this.vx;
        this.y += this.vy;

    }
}