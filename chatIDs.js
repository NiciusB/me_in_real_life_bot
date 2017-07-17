const storage = require('node-persist');
storage.initSync();

function ChatIDs() {
  this._list = storage.getItemSync('chatIDs');
  if (!this._list) this._list = []
}

ChatIDs.prototype.add = function(chatID) {
  if(this._list.indexOf(chatID) === -1) {
    this._list.push(chatID);
    this.save()
    return true;
  }
  return false;
}
ChatIDs.prototype.remove = function(chatID) {
  if(this._list.indexOf(chatID) !== -1) {
    this._list.splice(this._list.indexOf(chatID), 1);
    this.save()
    return true;
  }
  return false;
}
ChatIDs.prototype.save = function() {
  storage.setItem('chatIDs', this._list)
  return true;
}
ChatIDs.prototype.list = function() {
  return this._list;
}

module.exports = new ChatIDs()