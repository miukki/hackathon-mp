var qqtestvideo = 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH'

// pages/album/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: true,
    title: "Miniapp Hackathon",
    date: "September 2017",
    items : [
      { type: 'picture', src: '/assets/demo/1.jpg' },
      // { type: 'video', src: qqtestvideo },
      // { type: 'video', src: qqtestvideo },
      // { type: 'video', src: qqtestvideo },
      
      { type: 'picture', src: '/assets/demo/2.jpg' },
      { type: 'picture', src: '/assets/demo/3.jpg' },
      { type: 'picture', src: '/assets/demo/4.jpg' },
      { type: 'video', src: '/assets/demo/1.mp4' },
      { type: 'picture', src: '/assets/demo/5.jpg' },
      { type: 'picture', src: '/assets/demo/6.jpg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({title: 'Scrolly | ' + this.data.title + " (9)"})

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})