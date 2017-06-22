var Func = {}

Func.parseTime = (time) => {
  let currDate = new Date()
  if (typeof time === `string`) time = new Date(time)
  let diff = currDate - time
  if(diff < 60 * 1000){
    return `刚刚发布`
  } else if (diff < 60 * 60 * 1000) {
    return Math.floor(diff/60/1000)+`分钟前发布`
  } else if (diff < 60 * 60 * 1000 * 24) {
    return Math.floor(diff/60/60/1000)+`小时前发布`
  } else {
    return time.getFullYear()+`/`+(time.getMonth()+1)+`/`+time.getDate()
  }
}

Func.parseValidTime = (time) => {
  let currDate = new Date()
  if (typeof time === `string`) time = new Date()
  if(time.getFullYear() - currDate.getFullYear() > 50) {
    return `长期有效`
  } else {
    return time.getFullYear()+`/`+(time.getMonth()+1)+`/`+time.getDate()
  }
}

Func.arrayToString = (array) => {
  let text = ``
  for (var i = 0; i < array.length; i++) {
    text += ` `+ array[i]
  }
  return text
}

Func.isValid = (time) => {
  let currDate = new Date()
  if (currDate - time > 0){
    return false
  } else {
    return true
  }
}

Func.arrayToStringWithSymbol = (array, symbol) => {
  let text = ` `
  for (var i = 0; i < array.length; i++) {
    text += array[i] + ` ` +symbol + ` `
  }
  return text
}

Func.setParams = (params) => {
  let initParams = { limit: 10 }
  let data = params.params
  let dealType = ``
  let skip = data.skip ? data.skip : 0
  if (data.dealType === `采购`) {
    dealType = `买`
  } else if (data.dealType === `货源`) {
    dealType = `卖`
  } else {
    dealType = `全部`
  }
  let newParam = {
    skip: skip,
    dealType: dealType,
    product_category: data.product_category ? data.product_category : ``,
    product_tags: data.product_tags ? data.product_tags : [],
    product_min_quantity: data.product_min_quantity ? data.product_min_quantity: 0,
    location: data.location ? data.location : ``,
    delivery: data.delivery ? data.delivery : [],
    prepare_time: data.prepare_time ? data.prepare_time : ``,
    product_origin: data.product_origin ? data.product_origin : ``,
    searchText: data.searchText ? data.searchText : ``
  }
  initParams = Object.assign({}, initParams, newParam)
  return initParams
}

module.exports = Func
