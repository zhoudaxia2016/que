import observe from './observe.js'
import Watcher from './watcher.js'

function Que (options) {
  setData.call(this, options.data)
  setMethod.call(this, options.methods)
}

function setData (data) {
  observe(data)
  for (var key in data) {
    this[key] = data[key]
  }
}

function setMethod (methods) {
  for (var key in methods) {
    this[key] = methods[key].bind(this)
  }
}

Que.prototype.bind = function (cb) {
  new Watcher(cb.bind(this))
}

export default Que
