import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducer'

const store = createStore(rootReducer, applyMiddleware())

export default store
