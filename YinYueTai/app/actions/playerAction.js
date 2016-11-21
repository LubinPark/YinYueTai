import Octopus from '../utils/urlOctpus'
import {URL} from '../utils/url'
import * as types from './actionTypes'

function fetchAuthorInfo(params) {
  return (dispatch) => {
    let url = URL.authorInfo
    Octopus._fetch({url:url, body:{videoId:params.videoId} })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.msg == 'SUCCESS') {
        return dispatch(requestAuthorInfo(responseData))
      }
    })
    .catch(reason => {
    console.log(`链接错误------> ${reason}`)
    })
  }
}

function requestAuthorInfo(responseData) {
  return {
    type: types.REQUEST_AUTHOR_INFO,
    authorInfo: responseData.data
  }
}

function fetchMostWatch(params) {
  return (dispatch) => {
    let url = URL.mostWatch
    Octopus._fetch({url:url, body:{videoId:params.videoId, type:1, size: 50} })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.msg == 'SUCCESS') {
        return dispatch(requestMostWatch(responseData))
      }
    })
    .catch(reason => {
    console.log(`链接错误------> ${reason}`)
    })
  }
}

function requestMostWatch(responseData) {
  return {
    type: types.REQUEST_MOST_WATCH,
    mostWatch: responseData.data
  }
}

export function fetchPlayerIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type == 'authorInfo') {
      return dispatch(fetchAuthorInfo(params))
    } else if (params.type == 'mostWatch') {
      return dispatch(fetchMostWatch(params))
    }
  }
}
