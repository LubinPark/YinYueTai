import { combineReducers } from 'redux'
import TabBarReducer from './tabBarReducer'
import HomeReducer from './homeReducer'
import PlayerReducer from './playerReducer'
import UserReducer from './userReducer'
import ChatReducer from './chatReducer'
import MessageReducer from './messageReducer'

const rootReducer = combineReducers({
  TabBarReducer,
  HomeReducer,
  PlayerReducer,
  UserReducer,
  ChatReducer,
  MessageReducer
})

export default rootReducer
