const storage = require('node-persist');
const request = require('request');

function Memes() {
  this._list = storage.getItemSync('memes');
  if (!this._list) this._list = []
}

Memes.prototype.add = function (memeID) {
  if (this._list.indexOf(memeID) === -1) {
    this._list.push(memeID);
    this.save()
    return true;
  }
  return false;
}
Memes.prototype.save = function () {
  storage.setItem('memes', this._list)
  return true;
}
Memes.prototype.checkMemeAlreadySent = function (memeID) {
  return this._list.indexOf(memeID) !== -1;
}
Memes.prototype.getSpicyMeme = function (callback) {
  var memeInstance = this;
  request('https://reddit.com/r/me_irl/.json?sort=hot&limit=5', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body);
      parsed.data.children.every(function (meme) {
        if (!memeInstance.checkMemeAlreadySent(meme.data.id)) {
          memeInstance.add(meme.data.id);
          callback(meme);
          return false;
        } else return true;
      }, this);
    }
  });
}

module.exports = new Memes()