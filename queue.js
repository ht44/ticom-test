'use strict';

function Queue() {
  this._front = 0;
  this._back = 0;
  this._storage = new Object();
}

Queue.prototype.enqueue = function(data) {
  this._storage[this._back++] = data;
}

Queue.prototype.dequeue = function(data) {
  let out;
  if (this._front !== this._back) {
    out = this._storage[this._front];
    delete this._storage[this._front++];
    if (this._front === this._back) {
      this._front = 0;
      this._back = 0;
    }
    return out;
  }
}

module.exports = Queue;
