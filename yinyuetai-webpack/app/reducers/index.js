import { combineReducers } from 'redux'
import HomeReducer from './homeReducer'
import DealReducer from './dealReducer'
import UserReducer from './userReducer'
import SearchReducer from './searchReducer'


const rootReducer = combineReducers({
  HomeReducer,
  DealReducer,
  UserReducer,
  SearchReducer
})

export default rootReducer
