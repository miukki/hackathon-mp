// list.js
const app = getApp()
const GramData = require("../../lib/GramData")

Page({

  onLoad: function () {
    let items = GramData.getGrammar()
    if (items) {
      this.setData({
        items: items
      })
      console.log('list.onLoad Grammar.length', (items ? items.length : 0 ))
      // console.log("items[0]", items[0])
    } else {
      console.error("cant load grammar")
    }
  },

  onShareAppMessage: function () {
    let blob = {
      title: "CGram | list",
      path: 'pages/list/list'
    }
    console.log("sharing", blob)
    return blob
  },

  onPullDownRefresh: function() {
    GramData.init(true, this.onLoad)
  },

  // 事件处理函数
  gramItemTap: function(event) {
    console.log("event.target", event.target)
    console.log("gramItemTap.item", event.target.dataset.item)
    let item = event.target.dataset.item

    // // problems - tabs can't have query params
    // wx.switchTab({
    //   url: '../gram/gram?cname=' + item.cname
    // })
    wx.navigateTo({
      url: '../gram/gram?cname=' + item.cname
    })
  }

})
