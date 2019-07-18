import {SVG_NS} from '../settings'
import pingSound from '../../public/sounds/pong-03.wav'
import pingSound2 from '../../public/sounds/pong-02.wav'
let lastGoal

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1
        this.ping = new Audio(pingSound)
        this.ping2 = new Audio(pingSound2)
        this.reset()
    }
    reset() {
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        this.vy = 0
        while(this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 -5)
        }
        this.vx = this.direction ? 1 * (6 - Math.abs(this.vy)) : -1 * (6 - Math.abs(this.vy))
        
        // console.log(this.vy)
        // console.log(this.vx)
    }
    paddleCollision(player1, player2) {
        if (this.vx > 0) {
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY) 
            ) {
                this.vx = -this.vx;
                this.ping.play()
            }
        } else {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                (this.x - this.radius <= rightX)
                && (this.x - this.radius >= leftX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx
                this.ping2.play()
            }
        }
    }

    wallCollision() {
        const hitTop = this.y - this.radius <= 0
        const hitBottom = this.y + this.radius >= this.boardHeight
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;

        if(hitTop || hitBottom) {
            this.vy = -this.vy
        } else if (hitLeft || hitRight) {
			this.vx = -this.vx;
        }
        // console.log(this.direction)

    }

    goal(player) {
        player.score++
        this.reset();
        // console.log(player.score)
    }

    render(svg, player1, player2 ) {
        this.x += this.vx
        this.y += this.vy
        
        this.wallCollision();
        this.paddleCollision(player1, player2)

        let circle = document.createElementNS(SVG_NS, 'circle')
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
        circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
        circle.setAttributeNS(null, 'fill', 'white'); 
        svg.appendChild(circle)

        //Goal Detection
        const rightGoal = this.x + this.radius >= this.boardWidth
        const leftGoal = this.x - this.radius <= 0

        if (rightGoal) {
            console.log(lastGoal)
            this.goal(player1) 
            if(lastGoal !==player1){
                this.direction = !this.direction
            }
            // lastGoal=player1
        } else if (leftGoal) {
            console.log(lastGoal)
            this.goal(player2)
            if(lastGoal !==player2){
                this.direction = !this.direction
            }
            // lastGoal=player2
        }
    }
}