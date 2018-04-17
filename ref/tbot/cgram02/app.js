// app.js

const APPCONFIG = {
  // startUrl: 'pages/index/index'
  // startUrl: 'pages/daily/daily',
  // startTab: '../daily/daily',
  // startUrl: '../cards/cards',
  // startTab: '../lessons/lessons',
  // startUrl: '../gram/gram',
  // startUrl: 'pages/list/list'
  // startUrl: 'pages/gram/gram?cname=yingai'
}

const GramData = require("./lib/GramData")

const goStartPage = () => {

  if (APPCONFIG.startUrl) {
    wx.navigateTo({
      url: APPCONFIG.startUrl
    })
  }

  if (APPCONFIG.startTab) {
    wx.switchTab({
      url: APPCONFIG.startTab
    })
  }

}

function ax() {
  return getApp()
}

App({
  onLaunch: () => {
    console.log("launchx")

    // force to load from server at startup
    // NO - do this from the page so we can have a redraw event
    // GramData.init(true)

    setTimeout( function() {
      goStartPage()
    }, 1000)
  },

  GramData: require("./lib/GramData"),
  // GramTest: require("./test/GramTest"),
  status: "ready",
  w: window,

  globals: {
    examplesCount: 0,
    gramsCount: 0,
    loading: true
  },

  setCurrentPage(page) {
    this.globals.currentPage = page
  }

  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData:{
  //   userInfo:null
  // }

})
