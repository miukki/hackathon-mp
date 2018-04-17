// pages/album/add.js
const AV = require('../../../utils/av-weapp-min.js')
// const leancloud = require('../../../utils/leancloud')
const util = require('../../../utils/util')
const Album = require('../../../model/album')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    title: '',
    videos: [],
    urls: [],
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(dpd);

  },

  createAlbum: () => {

    // leancloud.request({
    //   url: 'album/add',
    //   method: 'POST',
    //   data: {
    //     name: this.data.title,
    //     imgUrl: data.url,
    //     imgObjectId: data.objectId
    //   },
    //   success: function () {
    //     self.refresh();
    //   }
    // });
  },

  uploadToServer: (files, tag) => {
  },

  bindSubmitAlbum: function () {
    let acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(true)

    // TODO - get User to set proper ACL
    // acl.setReadAccess(AV.User.current(), true);
    // acl.setWriteAccess(AV.User.current(), true);

    let albumData = {
      title: this.data.title,
      pics: this.data.urls,
      userId: this.data.userId
    }
    console.log('albumData', albumData)
    new Album(albumData)
      .setACL(acl).save().then((resp) => {
      console.log('album created', resp)
    }).catch(console.error)

  },

  uploaderVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        this.setData({
          videos: [].concat(this.data.videos, res.tempFilePath)
        })

        const maps = this.data.videos.map((tempFilePath) => {
          let fileName = tempFilePath.replace('wxfile://', '')

          return new AV.File(fileName, {
            blob: {
              uri: tempFilePath
            }
          }).save()

        })

        AV.Promise.all(maps).then((files) => {
          this.setData({
            urls: [].concat(this.data.urls, files.map((f) => f.url()))
          })

          console.log('files', this.data.urls)

        }).catch(console.error)



      }
    })
  },
  uploaderImage: function () {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        this.setData({
          files: [].concat(this.data.files, res.tempFilePaths)
        })

        const maps = this.data.files.map((tempFilePath) => {
          let fileName = tempFilePath.replace('wxfile://', '')

          return new AV.File(fileName, {
            blob: {
              uri: tempFilePath
            }
          }).save()

        })

        AV.Promise.all(maps).then((files) => {
          this.setData({
            urls: [].concat(this.data.urls, files.map((f) => f.url()))
          })

          console.log('files', this.data.urls)

        }).catch(console.error)




      }// success end
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    console.log(this)
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({ 'userId': res.iv })

            console.log('!', that.data.userId)

          }
        })
      }
    })
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
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {  },

  bindKeyInput: function (e) {
    let title = e.detail.value
    console.log('bindKeyInput', title)
    this.setData({
        title: title
    })
  }

})
