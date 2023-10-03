import { Component } from 'react'
import { connect } from 'react-redux'
import { PLAYER_ACTION, PLAYER } from '../constants/constants'
import { winner } from '../utils'
import { movePlayer, actionDraw, playerWin, START_NEW_GAME } from '../actions'
import './game.css'

class Game extends Component {
  handleClick = (index) => {
    let currentPlayer
    let currentSquares = [...this.props.cellsArray]
    if (currentSquares[index] === null && !winner(currentSquares)) {
      currentSquares[index] = this.props.player ? PLAYER.CROSS : PLAYER.NOUGHT
      currentPlayer = !this.props.player
    } else {
      return
    }
    this.props.movePlayer({ currentPlayer, currentSquares })

    if (winner(currentSquares)) {
      this.props.playerWin(this.props.player)
    }
    if (!winner(currentSquares) && !currentSquares.includes(null)) {
      this.props.actionDraw()
    }
  }

  startNewGame = () => {
    this.props.startNewGame()
  }

  isMove = () => {
    return this.props.draw ? (
      <div className="whoseMove">{PLAYER_ACTION.DRAW}</div>
    ) : (
      <div className="whoseMove">
        {this.props.currentMove}{' '}
        {this.props.player ? PLAYER.CROSS : PLAYER.NOUGHT}
      </div>
    )
  }

  render() {
    return (
      <div className="wrapper">
        <button className="start__btn" onClick={this.startNewGame}>
          Начать заново
        </button>
        <div className="container">
          {this.props.cellsArray.map((square, i) => (
            <button
              key={i}
              className="square"
              onClick={() => this.handleClick(i)}
            >
              {square}
            </button>
          ))}
        </div>
        <div className="info">Информация</div>
        {this.isMove()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cellsArray: state.cellsArray,
  player: state.player,
  currentMove: state.currentMove,
  draw: state.draw,
})

const mapDispatchToProps = (dispatch) => ({
  movePlayer: (currentPlayer) => dispatch(movePlayer(currentPlayer)),
  playerWin: (player) =>
    dispatch(playerWin({ player: player, currentMove: PLAYER_ACTION.WIN })),
  actionDraw: () => dispatch(actionDraw(true)),
  startNewGame: () => dispatch(START_NEW_GAME),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
