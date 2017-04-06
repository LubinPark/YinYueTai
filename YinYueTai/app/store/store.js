import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers/rootReducer'

const logger = store => next => action => {
  // console.info(action.type)
  // console.info(action)
  let result = next(action)
  // console.log('next state')
  // console.log(` ${JSON.stringify(store.getState())} `)
  return result
}

let createStoreWithMiddleware = applyMiddleware(logger,thunk)(createStore)
let store = createStoreWithMiddleware(rootReducer)

export default store
