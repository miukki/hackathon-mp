
const Log = {
  idx: 0,

  init: () => {
    wx.removeStorageSync('logs')
  },

  log: (msg, obj) => {
    // let data = wx.getStorageSync('logs')
    // data.push(msg + ' | ' + JSON.stringify(obj))
    // wx.setStorageSync('logs', data)
    if (obj) {
      console.log(msg, obj)
    } else {
      console.log(msg)
    }
  },

  info: (msg, obj) => {
    Log.log(msg, obj)
  },

  stack() {
    let stack = (new Error()).stack
    console.log('stack', stack)
  },

  error: (msg, obj) => {
    Log.log("ERROR:" + msg, obj)
  },

  warn: (msg, obj) => {
    console.warn("WARNING", msg, (obj ? obj : ''))
  },

}

Log.init()

module.exports = Log
