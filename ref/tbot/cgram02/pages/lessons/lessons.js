// list.js
const app = getApp()

let Lessons = require("../../lib/Lessons")
let Log = require("../../lib/Log")

Page({

  // data: {
  //   items: GramData.getGrammar()
  // },

  onLoad: function () {
    let items = Lessons.all()
    if (items) {
      this.setData({
        items: items
      })
      Log.log('list.onLoad Grammar.length', (items ? items.length : 0 ))
      // Log.log("items[0]", items[0])
    } else {
      Log.error("cant load Lessons")
    }
  },

  onShareAppMessage: function () {
    let blob = {
      title: "CGram | lessons",
      path: 'pages/lessons/lessons'
    }
    Log.log("sharing", blob)
    return blob
  },

  // 事件处理函数
  tapItem: function(event) {
    Log.log("event.target", event.target)
    Log.log("gramItemTap.item", event.target.dataset.item)
    let item = event.target.dataset.item

    // // problems - tabs can't have query params
    // wx.switchTab({
    //   url: '../gram/gram?cname=' + item.cname
    // })
    wx.navigateTo({
      url: '../cards/cards?lesson=' + item.cname
    })
  }

})
