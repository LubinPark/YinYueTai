import * as TabBarAction from './tarBarAction'
import * as HomeAction from './homeAction'
import * as UserAction from './userAction'

const allActions = {
  ...TabBarAction,
  ...HomeAction,
  ...UserAction
}

export default allActions
