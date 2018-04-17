let Log = require("./Log")
let Utils = require("./Utils")

let app = getApp()

const GramUtils = {

  setExample: function(page, cname) {
    cname = cname || page.data.cname
    let keyex
    let examples = page.data.examples || app.GramData.findExamples(cname)

    if (!page.data.keyex) {
      // first time, choose 0th example since its a 'keyex'
      keyex = examples[0]
    } else {
      // else any random ex
      keyex = Utils.sample(examples)
    }
    Log.info("found examples #", (examples ? examples.length : 0))
    Log.info("keyex", keyex)
    page.setData({
      keyex: keyex,
      examples: examples
    })

  },

  seeMore: function(cname, page) {
    Log.info("seeMore", cname)
    let url =  '../gram/gram?cname=' + cname
    wx.navigateTo({
      url: url
    })
  },

}

module.exports = GramUtils
