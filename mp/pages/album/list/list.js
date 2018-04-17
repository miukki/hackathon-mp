const Album = require('../../../model/album')
const AV = require('../../../utils/av-weapp-min.js')
// const leancloud = require('../../../utils/leancloud')

// pages/album/list.js
Page({

  data: {
    albums: []
  },

  onShareAppMessage: function () {

  },

  onReady: function () {
    this.fetchAlbums()
  },

  // TODO - limit to last 10 albums
  // TODO - set ACL properly on save
  fetchAlbums: function () {
    console.log('fetchAlbums')
    new AV.Query('Album')
      .descending('createdAt')
      .find({})
      .then(albums => {
        console.log('albums', albums)
        this.setData({ albums })
      }, function (error) {
        console.error('error', error)
      })
      .catch(console.error);
  },

  viewAlbum: function (e) {
    let item = e.currentTarget.dataset.item
    console.log('item', item)
    let url = '/pages/album/view/view?id=' + item.objectId
    console.log('view ', url)
    wx.navigateTo({
      url: url,
    })
  }

})