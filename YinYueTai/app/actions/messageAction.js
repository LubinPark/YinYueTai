
function sendMessage(params) {
  return (dispatch) => {
    return dispatch(saveMessage(params.message))
  }
}

function saveMessage(responseData) {
  return {
    type: 'MESSSAGE_SAVE',
    data: responseData
  }
}

export function fetchMessageActionIfNeeded(params = {}) {
  return(dispatch, getState) => {
    if (params.type === 'sendMessage') {
      return dispatch(sendMessage(params))
    } else if (params.type === 'received') {
      return dispatch(reseivedToChat())
    } else {
      // console.log(`NONE`);
    }
  }
}
