import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element)
    
    //Paddle Dimensions
    this.paddleWidth = 8
    this.paddleHeight = 56
    this.boardGap = 10

    this.board = new Board(this.width, this.height)
    this.ball = new Ball(8, this.width, this.height)

    //Player 1 Paddle
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    )

    //Player 2 Paddle
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
    )

    //event listener to pause game
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause
          this.player1.speed = 10
          this.player2.speed = 10
          console.log(this.pause)
      }
    })

  }

  render() {
    
    if(this.pause) {
      this.player1.speed = 0
      this.player2.speed = 0
      return
    }

    //Clear board
     this.gameElement.innerHTML = ''

    //create SVG element for the board
    let svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttributeNS(null, 'width', this.width)
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)

    this.board.render(svg)
    this.player1.render(svg)
    this.player2.render(svg)
    this.ball.render(svg)
  }
}
