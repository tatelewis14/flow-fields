import { Particle } from "./Particles.js";

export class Effect {
    constructor(width, height, colors = ['#FF5733', '#FFC300', '#36DBCA', '#6C5CE7', '#F53B57',
    '#5758BB', '#25CCF7', '#6D214F', '#FF7F50', '#1ABC9C',
    '#F1C40F', '#3498DB', '#9B59B6', '#E74C3C', '#2ECC71']) 
    {
        this.width = width;
        this.height = height;
        this.colors = colors;
        this.rafId;
        this.cellSize = 20;
        this.rows;
        this.cols;
        this.flowField = [];
        this.curve = 0.5;
        this.zoom = 0.3
    }
    init(objAmount, array, obj) {

    this.rows = Math.floor(this.height/this.cellSize);
    this.cols = Math.floor(this.width/this.cellSize);
    this.flowField = [];

    for(let y = 0; y<this.rows; y++) {
        for(let x = 0; x<this.cols; x++) {
            let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve
            this.flowField.push(angle);
        }
    }
        
        for(let i = 0; i<objAmount; i++) {
            let radius = (Math.random() * 25) + 5        
            let x = Math.random() * (this.width - radius*2) + radius;
            let y = Math.random() * (this.height - radius*2) + radius
            let vx = ((Math.random() - 0.5) * 5) + 0.1;
            let vy = ((Math.random() - 0.5) * 5) + 0.1;
    
            array.push(new obj(x,y, vx, vy, this))
    }
    }
    animate(ctx, arr) {
        const animate =()=> {
        this.rafId = requestAnimationFrame(animate)
        ctx.clearRect(0,0,this.width, this.height)
        arr.forEach(obj=>{
        if(obj.history.length > 150) {
            ctx.save()
            ctx.strokeStyle = `red`
        } 
        obj.update()
        obj.draw(ctx)
        ctx.restore()
    })
    }
    animate()
    this.showGrid(ctx)
}
stop() {
    cancelAnimationFrame(this.rafId)
}
showGrid(ctx) {
    for(let c = 0; c<this.cols; c++){
        ctx.beginPath()
        ctx.moveTo(0, this.gridSize*c)
        ctx.lineTo(this.height, this.gridSize*c)
        ctx.stroke()
    }
    for(let r = 0; r<this.rows; r++){
        ctx.beginPath()
        ctx.moveTo(0, this.gridSize*r)
        ctx.lineTo(this.width, this.gridSize*r)
        ctx.stroke()
    }
}
}
