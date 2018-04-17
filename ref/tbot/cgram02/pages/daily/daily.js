// daily.js

const Log = require("../../lib/Log")
const GramUtils = require("../../lib/GramUtils")
const GramData = require("../../lib/GramData")

let app = getApp()

Page({

  data: {
    item: {},
    examples: null,
    cname: "cname"
  },

  onShareAppMessage: function () {
    let cname = this.data.cname
    let blob = {
      title: cname,
      // path: 'pages/daily/daily'
      path: 'pages/gram/gram?cname=' + cname
    }
    Log.info("sharing", blob)
    return blob
  },

  onLoad: function(option) {
    GramData.init(false, this.doneLoading)
  },

  doneLoading:function(grammar) {
    let gram = app.GramData.findDaily()
    // let gram = app.GramData.randomGram()
    if (!gram) {
      Log.error("cant find daily gram")
      return
    }
    let url = '/pages/gram/gram?cname=' + gram.cname
    Log.info('daily gram:', gram)
    Log.info('daily.redirectTo', url)
    wx.redirectTo({
      url: url
    })
  }

})
