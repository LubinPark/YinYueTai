import { combineReducers } from 'redux'
import TabBarReducer from './tabBarReducer'
import HomeReducer from './homeReducer'
import PlayerReducer from './playerReducer'
import UserReducer from './userReducer'


const rootReducer = combineReducers({
  TabBarReducer,
  HomeReducer,
  PlayerReducer,
  UserReducer
})

export default rootReducer
