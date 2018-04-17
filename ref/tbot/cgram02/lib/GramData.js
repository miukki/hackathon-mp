// global scope

const AppConfig = require('./AppConfig')


let DateLib = require("./DateLib")
let Log = require("./Log")
// let _ = require("./vendor/underscore-min.js")
let app = getApp()

let GramData = {

  status: 'init',
  loaded: false,
  cache: {
    grammar: null,
    examples: null
  },

  init: function(force, callback) {
    Log.info(`GramData.init loaded: ${GramData.loaded} force: ${force}`)
    if (GramData.loaded && !force) {
      Log.info('GramData.cached')
      let grammar = GramData.getGrammar()
      callback(grammar)
    } else {
      GramData.loadGrammar(callback)
      Log.info('<< init')
    }
  },

  clearAll: () => {
    wx.removeStorageSync("Grammar")
    wx.removeStorageSync("Examples")
    wx.removeStorageSync("Lessons")
    GramData.cache = {
      grammar: null,
      examples: null
    }
  },

  // //// removed - not loading 'all' examples anymore
  // loadExamples: function() {
  //   Log.info('net loading examples')
  //   wx.request({
  //     url: EXAMPLES_API,
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     dataType: 'json',
  //     success: function(res) {
  //       Log.info('req.res', res)
  //       let examples = res.data
  //       GramData.saveExamples(res.data)
  //     },
  //     fail: function(err) {
  //       console.error('failed to load examples', err)
  //     },
  //     complete: function() {
  //       Log.info('Examples network load complete')
  //     }
  //   })
  // },

  // just load examples for one GramPage
  loadGramExamples: function(cname, callback) {
    let url = `${AppConfig.EXAMPLES_API}&cname=${cname}`
    Log.info('loadGramExamples', url)
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function(res) {
        Log.info('loadGramExamples.res', res)
        let examples = res.data
        // TODO - store cache?
        GramData.saveExamples(examples)
        if (callback) {
          callback(examples)
        }
      },
      fail: function(err) {
        console.error('failed to load examples', err)
      },
      complete: function() {
        Log.info('Examples network load complete')
      }
    })
  },

  doneLoading: function(callback) {
    console.log('doneLoading')
    GramData.loaded = true
    let page = getApp().globals.currentPage
    let grammar = GramData.getGrammar()
    if (page && page.redraw) {
      console.log('calling page.redraw')
      page.redraw(grammar)
    } else {
      Log.info('page', page)
    }
    if (callback) {
      callback(grammar)
    }
  },

  // FIXME - merge identical code with above
  loadGrammar: function(callback) {
    Log.info('net loading grammar')
    wx.request({
      url: AppConfig.GRAMMAR_API,
      header: {
        'content-type': 'application/json'
      },

      dataType: 'json',
      success: function(res) {
        Log.info('loadGrammar.success', res)
        GramData.setGrammar(res.data)
        GramData.doneLoading(callback)
      },

      fail: function(err) {
        Log.error('loadGrammar.fail', err)
      },

      complete: function(obj) {
        Log.info('loadGrammar.complete', obj)
      }
    })
  },

  // add indexes
  prepareGrammar: function(data) {
    if (!data) {
      data = wx.getStorageSync("Grammar")
    }
    let c = 0
    let ret = data.map( (item) => {
      item.index = c
      c++
      return item
    })
    // Log.info('grammar', ret)
    return ret
  },

  setGrammar: function(data) {
    let grammar = GramData.prepareGrammar(data)
    this.cache.grammar = grammar
    wx.setStorageSync('Grammar', grammar)
  },

  getGrammar: function(q) {
    if (this.cache.grammar) {
      return this.cache.grammar
    }
    this.cache.grammar = wx.getStorageSync("Grammar")
    Log.info('GramData.getGrammar', q)
    Log.stack()
    return this.cache.grammar
  },

  getExamples: function(q) {
    Log.info('getExamples', q)
    return wx.getStorageSync("Examples")
  },

  saveExamples: function(data) {
    wx.setStorageSync('Examples', data)
  },

  // calculate which gram to show
  // FIXME - assumes we have < 365 items!
  findDaily: () => {
    // debugger
    let doy = DateLib.getDayOfYear()
    let gramTotal = GramData.getGrammar().length
    let todayIndex = doy % gramTotal
    let grams = GramData.getGrammar().filter( elem => {
      // .filter if function true it returns the element
      return (elem.index === todayIndex)
    })
    let gram = grams[0]
    Log.info(`daily gram ${todayIndex}/${gramTotal}`, gram.cname)
    return gram
  },

  randomGram: () => {
    let gramTotal = GramData.getGrammar().length
    let idx = Math.floor(Math.random() * gramTotal)
    let gram = GramData.getGrammar()[idx]
    Log.info("randomGram", gram)
    return gram
  },

  getSet: (gramSet) => {
    let grams = GramData.getGrammar().filter( elem => {
      let flag = false
      // elem.cname is in items (items is an array)
      gramSet.items.map( item => {
        if(item === elem.cname) {
          flag = true
        }
      })
      return flag
    })
    return grams
  },

  findOne: function(cname) {
    if (!GramData.getGrammar()) {
      console.error('GramData data not ready. cname=', cname)
      return null
    }
    let items = GramData.getGrammar().filter( function(line, index) {
      // Log.info("comparing", line, cname)
      return (line.cname === cname)
    })
    Log.info('find', cname, 'is', items)
    return items[0]
  },

  findExamples: function(cname) {
    if (!GramData.getExamples()) {
      console.warn('findExamples not ready')
    }
    let items = GramData.getExamples().filter( function(line, index) {
      let flag = false
      line.cnames.map( function(test) {
        if (test === cname) {
          // Log.info("found", line, test, cname)
          flag = true
        }
      })
      return (flag)
    })
    Log.info('findExamples', cname, 'is', (items ? items.length : 0) )
    return items
  },

  gramsCount: () => {
    return (GramData.getGrammar() ? GramData.getGrammar().length : 0)
  },

  examplesCount: () => {
    return (GramData.getExamples() ? GramData.getExamples().length : 0)
  }

}

// called once when the app opens

module.exports = GramData
