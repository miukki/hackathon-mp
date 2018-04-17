const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getFileName = name => {

  var index;
  if (!name) {
    return '';
  }
  if ((index = name.lastIndexOf('/')) >= 0) {
    return name.substr(index + 1);
  }
  if ((index = name.lastIndexOf('\\')) >= 0) {
    return name.substr(index + 1);
  }
  return name;

}

const showFail = (title) => {
  wx.showToast({
    title: title,
    duration: 3000,
    mask: true
  });
}

module.exports = {
  formatTime: formatTime,
  getFileName: getFileName,
  showFail: showFail
}
