class Octopus {

   static _fetch(params) {

    let body = params.body || {}
    let method = params.method || "GET"
    let headers = params.headers || { 'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                      'App-Id': '10101042',
                                      'Device-Id': '9f89c84a559f573636a47ff8daed0d33',
                                      'Device-V': 'aU9TXzEwLjEuMV82NDAqMTEzNl8xMDAwMDEwMDBfaVBob25lIDVz'
                                    }

    if (method == "GET" || method == "HEAD") {
      return fetch(params.url, {method: method, headers: headers})
    } else {
      return fetch(url, {method: method, headers: headers, body: JSON.stringify(body)})
    }
  }

}

export default Octopus
