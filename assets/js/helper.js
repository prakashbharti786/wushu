const findObjectIndex = (arr, obj, key = 'id') => {
  return arr.findIndex(item => {
    return item[key] === obj[key]
  })
}

export const findObjectIndexBookmarks = (arr, obj) => {
  return arr.findIndex(item => {
    return item.docId === obj.doc_id
  })
}

export const sortObjectsByDate = (arrayOfObj, key, type) => {
  let sorted = []
  if (type === 'ascending') {
    sorted = arrayOfObj.sort(function(a, b) {
      return new Date(a[key]).getTime() - new Date(b[key]).getTime()
    })
  } else {
    sorted = arrayOfObj.sort(function(a, b) {
      return new Date(b[key]).getTime() - new Date(a[key]).getTime()
    })
  }
  return sorted
}

export const materialDate = (
  val,
  time = true,
  materialFormatWithoutTime = 'month DD, YYYY'
) => {
  if (!val) {
    return ''
  }
  const dateObj = new Date(val)
  let d = dateObj.getDate()
  let min = dateObj.getMinutes()
  let sec = dateObj.getSeconds()
  let hour = dateObj.getHours()
  let mid = 'AM'
  const y = dateObj.getFullYear()
  const materialFormat = 'month DD, YYYY, 00:00:00 AM'
  if (hour === 0) {
    // At 00 hours we need to show 12 am
    hour = 12
  } else if (hour > 12) {
    hour = hour % 12
    mid = 'PM'
  }
  d = ('0' + d).slice(-2)
  min = ('0' + min).slice(-2)
  sec = ('0' + sec).slice(-2)
  hour = ('0' + hour).slice(-2)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  if (time) {
    return materialFormat
      .replace('YYYY', y)
      .replace('month', months[dateObj.getMonth()])
      .replace('DD', d)
      .replace('00:00:00', `${hour}:${min}:${sec}`)
      .replace('AM', mid)
  }
  return materialFormatWithoutTime
    .replace('YYYY', y)
    .replace('month', months[dateObj.getMonth()])
    .replace(
      'MM',
      dateObj.getMonth() > 9 ? dateObj.getMonth() : '0' + dateObj.getMonth()
    )
    .replace('DD', d)
}

export default findObjectIndex
