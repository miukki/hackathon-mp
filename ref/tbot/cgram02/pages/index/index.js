// index.js

const app = getApp()
const GramData = require("../../lib/GramData")
const Log = require('../../lib/Log')

Page({


  // FIXME - this is calling getGrammar to load all grammar before counting
  data: {
    userInfo: {},
    GramData: GramData,
    gramsCount: 0,
    examplesCount: 0,
    loaded: GramData.loaded
  },

  onShareAppMessage: function () {
    let blob = {
      title: "CGram | home",
      path: 'pages/index/index'
    }
    console.log("sharing", blob)
    return blob
  },

  onLoad: function () {
    Log.info('onLoad')
    app.setCurrentPage(this)
    this.reloadData(true)
  },

  onReady: function() {
    Log.info('onReady')
  },

  onShow: function() {
    Log.info('onShow')
    // this.redraw()
  },


  onRouteEnd: function() {
    Log.info('onRouteEnd')
    this.redraw()
  },

  onPullDownRefresh: function() {
    this.reloadData()
  },

  redraw: function(grammar) {
    let blob = {
      gramsCount: GramData.gramsCount(),
      examplesCount: GramData.examplesCount(),
      loaded: GramData.loaded
    }
    this.setData(blob)
  },

  doneLoading: function(grammar) {
    console.log("doneLoading", (grammar ? grammar.length : 'no data') )
    this.redraw(grammar)
  },

  reloadData: function(force) {
    console.log("reloadData")
    this.clearData()
    GramData.init(force, this.doneLoading)
  },

  clearData: function() {
    console.log("clearData")
    this.setData({
      gramsCount: 0,
      examplesCount: 0,
      loaded: false
    })
    GramData.clearAll()
  },

  imageEvent: function(evt) {
    Log.info('imageEvent', evt.detail)
  },

  // getUserInfo: function() {
    // 调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  // }

})
