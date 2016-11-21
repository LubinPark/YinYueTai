class Octopus {

   static _fetch(params) {

    let url = params.url
    let body = params.body || {}
    let method = params.method || "GET"
    let headers = params.headers || { 'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'App-Id': '10101042',
                                      'Device-Id': '9f89c84a559f573636a47ff8daed0d33',
                                      'Device-V': 'aU9TXzEwLjEuMV82NDAqMTEzNl8xMDAwMDEwMDBfaVBob25lIDVz'
                                    }

    if (method == "GET" || method == "HEAD") {
      url = url + '?' + jsonToQueryString(body)
      // console.log(url)
      return fetch(url, {method: method, headers: headers})
    } else {
      return fetch(url, {method: method, headers: headers, body: JSON.stringify(body)})
    }
  }

}

function jsonToQueryString(json) {
  return Object.keys(json).map(function(key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&')
}

export default Octopus
