import { PLAYER_ACTION } from '../constants/constants'
import { createEmptyArray } from '../utils'

export const initialState = {
  cellsArray: createEmptyArray(),
  player: true,
  currentMove: PLAYER_ACTION.TURN,
  draw: false,
}

export const rootReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'MOVE_PLAYER': {
      return { ...state, player: payload }
    }
    case 'START_NEW_GAME': {
      return { ...initialState, cellsArray: createEmptyArray() }
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
