const DateLib = {
  getDayOfYear: () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    const doy = Math.ceil(diff / oneDay)
    console.log('Day of year: ' + doy)
    return doy
  }
}

module.exports = DateLib
