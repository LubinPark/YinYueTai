var Func = {}

Func.parseTime = (time) => {
  let currDate = new Date()
  if (typeof time === 'string') time = new Date(time)
  let diff = currDate - time
  if(diff < 60 * 1000){
    return '刚刚发布'
  } else if (diff < 60 * 60 * 1000) {
    return Math.floor(diff/60/1000)+'分钟前发布'
  } else if (diff < 60 * 60 * 1000 * 24) {
    return Math.floor(diff/60/60/1000)+'小时前发布'
  } else {
    return time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()
  }
}

Func.parseValidTime = (time) => {
  let currDate = new Date()
  if (typeof time === 'string') time = new Date()
  if(time.getFullYear() - currDate.getFullYear() > 50) {
    return '长期有效'
  } else {
    return time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()
  }
}

Func.arrayToString = (array) => {
  let text = ''
  for (var i = 0; i < array.length; i++) {
    text += ' '+ array[i]
  }
  return text
}

module.exports = Func
