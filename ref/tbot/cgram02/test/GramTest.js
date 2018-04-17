// include grams and gramset

const GramData = require("../lib/GramData")
const Lessons = require("../lib/Lessons")

function clog(msg, val) {
  console.log("-- TEST || ", msg, val)
}

function assertEqual(p1, p2, msg) {
  if (p1 !== p2) {
    console.warn("FAIL ", msg)
  }
}

const GramTest = {

  gs: () => {
    let gset = Lessons.findByCname("test-set")
    let gramList = GramData.getSet(gset)
    clog("TEST gset", gset)
    clog("TEST gramList", gramList)
    // assertEqual(gramList[0].cname, "yihou", "getSet")
  },

  findByCname: () => {
    let cname = "time-related"
    let gset = Lessons.findByCname(cname)
    clog("TEST findByCname", gset)
    assertEqual(gset.cname, cname)
  }

}

// // FIXME - this actually crashese when there is no data prepared and it runs at startup
// GramTest.gs()
// GramTest.findByCname()

module.exports = GramTest
