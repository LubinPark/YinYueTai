import Octopus from '../utils/urlOctpus'
import { URL } from '../utils/url'
import * as types from './actionTypes'

function fetchHome(params) {
  return (dispatch) => {
    let url = URL.home
    Octopus._fetch({url:url})
    .then(response => response.json())
    .then(responseData => {
      if (responseData.msg == 'SUCCESS') {
        return dispatch(requestHome(responseData))
      }
    })
    .catch(reason => {
      console.log(`链接错误------> ${reason}`)
    })
  }
}

function requestHome(responseData) {
  return {
    type: types.REQUEST_HOME,
    homeData: responseData.data
  }
}

export function fetchHomeIfNeeded(params = {}) {
  return(dispatch, getState) => {
    return dispatch(fetchHome(params))
  }
}
