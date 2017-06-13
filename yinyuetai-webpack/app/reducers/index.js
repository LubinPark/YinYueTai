import { combineReducers } from 'redux'
import HomeReducer from './homeReducer'
import DealReducer from './dealReducer'
import UserReducer from './userReducer'

const rootReducer = combineReducers({
  HomeReducer,
  DealReducer,
  UserReducer
})

export default rootReducer
