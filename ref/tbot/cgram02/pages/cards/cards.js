// list.js
// 获取应用实例

const Lessons = require("../../lib/Lessons")
const Utils = require('../../lib/Utils')
const GramUtils = require("../../lib/GramUtils")

const app = getApp()
const EXAMPLE_COUNT = 1     // just one per page

const VISIB_STATES = [

  {
    msg: "visible",
    en: "visible",
    cn: "hidden",
    pn: "hidden",
    meaning: "hidden",
    ex: "hidden"
  },

  {
    msg: "hidden",
    en: "visible",
    cn: "visible",
    pn: "hidden",
    meaning: "hidden",
    ex: "hidden"
  },

  {
    msg: "hidden",
    en: "visible",
    cn: "visible",
    pn: "visible",
    meaning: "hidden",
    ex: "hidden"
  },

  {
    msg: "hidden",
    en: "visible",
    cn: "visible",
    pn: "visible",
    meaning: "visible",
    ex: "hidden"
  },

  {
    msg: "hidden",
    en: "visible",
    cn: "visible",
    pn: "visible",
    meaning: "visible",
    ex: "visible"
  }

]

Page({

  data: {
    grams: [],
    gram: {},
    examples: [],
    cname: "Gram",
    indicatorDots: true,
    autoplay: true,
    vertical: true,
    state: 0,
    vis: VISIB_STATES[0],
    offset: 0
  },

  onLoad: function(option) {
    let grams
    if (option.lesson) {
      let gset = Lessons.findByCname(option.lesson)
      grams = app.GramData.getSet(gset)
    } else {
      // no param passed, get all grammar
      grams = app.GramData.getGrammar()
      // grams = grams.slice(0, 100)
    }
    this.setData({
      grams: grams
    })

    // TODO display from middle of the list
    // cannot do now because no method to navigate a slider
    // initialize the display with first gram item
    // let idx = Utils.random(grams.length)
    let idx = 0
    this.getGram(idx)
    console.log("loaded grams:", grams.length)
  },

  // if option.set has a value means an api is being passed
  //

  onShareAppMessage: function () {
    let cname = this.data.cname
    let blob = {
      title: cname,
      path: 'pages/cards/cards?cname=' + cname
    }
    console.log("sharing", blob)
    return blob
  },

  swipeChange: function(evt) {
    let offset = evt.detail.current
    // this.toggleVis(0)
    this.getGram(offset)
  },

  getGram: function(offset) {
    console.log("getGram", offset)
    let gram = this.data.grams[offset]
    this.setData({
      cname: gram.cname,
      gram: gram,
      offset: offset
    })
    wx.setNavigationBarTitle({
      title: gram.cname
    })
    this.getExamples(gram.cname)
    console.log("getGram", gram)
  },

  // cycle through visible states
  toggleVis: function(evt) {
    let state = this.data.state
    state++
    if (state > VISIB_STATES.length - 1) { state = 0 }
    let vis = VISIB_STATES[state]
    this.setData({
      state: state,
      vis: vis
    })
    console.log("state", state, vis)
  },

  getExamples: function(cname) {
    // let cname = this.data.gram.cname

    let examples = app.GramData.findExamples(cname)
    if (examples) {
      examples = examples.slice(0, EXAMPLE_COUNT)    // just 3
      console.log("examples", examples)
    } else {
      console.warn("no examples for", cname)
    }

    this.setData({
      examples: examples
    })

  },

  exTap: function(event) {
    let item = event.target.dataset.item
    console.log("exTap", item)
  },

  seeMore: function(event) {
    GramUtils.seeMore(this.data.cname, this)
  }

})
