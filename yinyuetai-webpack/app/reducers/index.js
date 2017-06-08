import { combineReducers } from 'redux'
import DealReducer from './dealReducer'
import UserReducer from './userReducer'

const rootReducer = combineReducers({
  DealReducer,
  UserReducer
})

export default rootReducer
