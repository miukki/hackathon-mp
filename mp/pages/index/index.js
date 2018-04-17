// const nbAlbums = 1
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: "Miniapp Hackathon",
    items: [
      { title: 'Miniprogram Hackathon', poster: '/assets/demo/1.jpg', albumId: "1", date: '09/2017'  },
      // { title: 'album title 2', poster: '/assets/demo/3.jpg', albumId: "2"  },
      // { title: 'album title 3', poster: '/assets/demo/5.jpg', albumId: "3"  },
    ],
    introLayout: null
  },

  //add album
  createAlbum: function () {
    wx.navigateTo({
      url: '../album/add/add'
    })
  },

  goToAlbum : () => {
    wx.navigateTo({
      url: '../album/view/view'
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('33')
    // get nb of items to adapt design accordingly
    console.log(this.data.items.length)
    if (this.data.items.length == 0) this.setData({introLayout : 'noalbum'})
    else if (this.data.items.length == 1) this.setData({ introLayout : 'onealbum' })
    else this.setData({ introLayout : 'twomorealbum' })

    console.log(this.data.introLayout)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  listAlbums:function() {
    wx.navigateTo({
      url: '../album/list/list'
    })
  },

  demo: function () {
    wx.navigateTo({
      url: '../album/demo/demo'
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
