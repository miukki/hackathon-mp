const Utils = {
  random: (p1) => {
    let r = Math.floor(Math.random() * p1)
    console.log(`Utils.random ${p1} = ${r}`)
    return r
  },

  sample: (arr) => {
    if (!(arr instanceof Array)) {
      return console.error("Utils.sample requires array")
    }
    return arr[Math.floor((Math.random() * arr.length))]
  }

}

module.exports = Utils
