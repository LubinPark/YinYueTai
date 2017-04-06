import { combineReducers } from 'redux'
import HomeReducer from './homeReducer'
import PlayerReducer from './playerReducer'

const rootReducer = combineReducers({
  HomeReducer,
  PlayerReducer
})

export default rootReducer
