import { combineReducers } from 'redux'
import HomeReducer from './homeReducer'
import PlayerReducer from './playerReducer'
import UserReducer from './userReducer'


const rootReducer = combineReducers({
  HomeReducer,
  PlayerReducer,
  UserReducer
})

export default rootReducer
