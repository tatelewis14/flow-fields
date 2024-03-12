import { Particle } from "./Particles.js";
import { Line } from "./Line.js";
import { Effect } from "./Effect.js";

const lineRange = document.getElementById('line-amount')
const lineRangeDisplay = document.getElementById('line-amount-value')
const header = document.getElementById('values')

const canvas = document.getElementById('gc');
const c = canvas.getContext('2d');


const colors = [
    '#FF5733', '#FFC300', '#36DBCA', '#6C5CE7', '#F53B57',
    '#5758BB', '#25CCF7', '#6D214F', '#FF7F50', '#1ABC9C',
    '#F1C40F', '#3498DB', '#9B59B6', '#E74C3C', '#2ECC71'
];

canvas.width = innerWidth;
canvas.height = innerHeight-header.style.height;

const effect = new Effect(innerWidth, innerHeight)

let particles= [];
let lines = [];



effect.init(500, lines, Line)
effect.animate(c, lines)

let stopped = false;

document.addEventListener('keydown', e=>{
    if(e.keyCode === 32) {
        if(!stopped) {
            effect.stop()
            stopped = !stopped
            console.log('stopped')
        } else {
            effect.animate(c, lines)            
            stopped = !stopped
            console.log('started')
        }
    }
})
window.addEventListener('resize', e=>{
    effect.stop()
    lines = []
    effect.init(500, lines, Line)
    effect.animate(c, lines)
})
lineRange.addEventListener('input', e=>{
    lineRangeDisplay.innerText = e.target.value
    lines = []
    effect.init(e.target.value, lines, Line)
    effect.animate(c, lines)
})
