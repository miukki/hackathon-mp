// var qqtestvideo = 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH'

const Album = require('../../../model/album')
const AV = require('../../../utils/av-weapp-min.js')


// pages/album/view.js
Page({

  data: {
    album: {
      createdAt: 'createdAt',
      title: 'title',
      pics: [
        {
          url: ''
        }
      ]
    }
  },

  onShareAppMessage: function () {
    console.log('this', this)
    let obj = {
      title: this.data.album.get('title'),
      path: 'pages/album/view/view?id=' + this.data.album.get('objectId')
    }
    console.log('shareObj', obj)
    return obj
  },

  onLoad: function (options) {
    console.log('options', options)
    let objectId = options.id
    new AV.Query('Album')
      .descending('createdAt')
      .get(objectId)
      .then(album => {
        console.log('album', album)
        console.log('album.pics', album.pics) // doesnt resolve?
        wx.setNavigationBarTitle({ title: album.attributes.title })
        this.setData({ album })
      }, function (error) {
        console.error('error', error)
      })
      .catch(console.error);
  },

  onReady: function () {
    // wx.setNavigationBarTitle({title: 'Scrolly | ' + this.data.title + " (9)"})

  },

})