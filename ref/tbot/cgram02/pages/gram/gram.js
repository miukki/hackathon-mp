// gram.js
const app = getApp()

const Log = require("../../lib/Log")
const GramUtils = require("../../lib/GramUtils")
const GramData = require("../../lib/GramData")

Page({

  data: {
    item: {},
    examples: [],
    cname: "Gram",
    option: null
  },

  onShareAppMessage: function () {
    let cname = this.data.option.cname
    let blob = {
      title: cname,
      path: 'pages/gram/gram?cname=' + cname
    }
    Log.log("sharing", blob)
    return blob
  },

  onShow: function() {
    Log.info('gram.onShow', this)
    app.setCurrentPage(this)
  },

  onLoad: function(option) {
    let data = {
      option: option
    }
    Log.info('gram.onLoad data => ', data)
    this.setData(data)  // for reload
    GramData.init(false, (grammar) => {
      this.loaded(grammar)
    })
  },

  loaded: function(grammar) {
    Log.info('gram.loaded', grammar.length)
    this.redraw(grammar)
    let cname = this.data.option.cname
    app.GramData.loadGramExamples(cname, (examples) => {
      Log.log("loaded examples", (examples ? examples.length : 0))
      this.setData({
        examples: examples
      })
      this.setExample()
    })
  },

  redraw: function(grammar) {
    let cname = this.data.option.cname

    Log.info('gram.redraw', grammar.length)
    Log.info('gram.redraw cname', cname)

    let gram = GramData.findOne(cname)

    if (gram) {
      Log.log("found gram", cname, "=", gram)
    } else {
      Log.warn("cant find gram for cname", cname)
    }
    this.setData({
      item: gram,
      cname: cname
    })

    wx.setNavigationBarTitle({
      title: cname
    })
  },

  onPullDownRefresh: function() {
    let that = this
    GramData.init(true, function(that) {
      Log.log('onPullDownRefresh callback')
      that.onLoad(that.option)
    })
  },

  relItemTap: function(event) {
    Log.log("relItemTap", item)
    let item = event.target.dataset.item
    let url =  '../gram/gram?cname=' + item
    wx.redirectTo({
      url: url
    })
  },

  gotoList: () => {
    wx.navigateTo({
      url: '../list/list'
    })
  },

  setExample: function() {
    GramUtils.setExample(this)
  },

  exTap: function(event) {
    let item = event.target.dataset.item
    Log.log("exTap", item)
  }

})
