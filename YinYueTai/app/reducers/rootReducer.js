import { combineReducers } from 'redux'
import TabBarReducer from './tabBarReducer'
import HomeReducer from './homeReducer'
import PlayerReducer from './playerReducer'
import UserReducer from './userReducer'
import ChatReducer from './chatReducer'


const rootReducer = combineReducers({
  TabBarReducer,
  HomeReducer,
  PlayerReducer,
  UserReducer,
  ChatReducer
})

export default rootReducer
