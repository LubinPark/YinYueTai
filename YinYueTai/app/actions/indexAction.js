import * as HomeAction from './homeAction'
import * as UserAction from './userAction'

const allActions = {
  ...HomeAction,
  ...UserAction
}

export default allActions
