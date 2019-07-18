import {SVG_NS} from '../settings'

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1

        this.reset()
    }
    reset() {
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        this.vy = 0
        while(this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 -5)
        }
        this.vx = this.direction * (6 - Math.abs(this.vy))
        
        console.log(this.vy)
        console.log(this.vx)
    }

    render(svg) {
        this.x += this.vx
        this.y += this.vy
        console.log(this.x)
        console.log(this.y)

        let circle = document.createElementNS(SVG_NS, 'circle')
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
        circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
        circle.setAttributeNS(null, 'fill', 'white'); 
        svg.appendChild(circle)
    }
}