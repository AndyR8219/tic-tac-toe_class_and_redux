import { PLAYER_ACTION } from '../constants/constants'
import { createEmptyArray } from '../utils'

export const initialState = {
  cellsArray: createEmptyArray(),
  player: true,
  currentMove: PLAYER_ACTION.TURN,
  draw: false,
}

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MOVE_PLAYER': {
      return {
        ...state,
        player: payload.currentPlayer,
        cellsArray: payload.currentSquares,
      }
    }
    case 'START_NEW_GAME': {
      return initialState
    }
    case 'WINNER': {
      return {
        ...state,
        currentMove: payload.currentMove,
        player: payload.player,
      }
    }
    case 'DRAW': {
      return {
        ...state,
        draw: payload,
      }
    }
    default:
      return state
  }
}
