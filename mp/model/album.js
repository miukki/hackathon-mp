const AV = require('../utils/av-weapp-min.js');

class Album extends AV.Object {

}

AV.Object.register(Album, 'Album');
module.exports = Album;