import Watcher from './watcher.js'

export default function (data) {
  /**
   * 遍历data，将大data所有属性设置为响应式的
   * 
   * @param {Object} data
   */

  if (data && typeof data === 'object'){
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}


function defineReactive (data, key, val) {
  /**
   * 响应式属性设置的主要函数
   *
   * @param {Object} data
   * @param {String} key
   * @param {-} val
   */

  var dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get () {
      if (Watcher.tmp){
        dep.addCb(Watcher.tmp)
	Watcher.tmp = null
      }
      return val
    },
    set (newVal) {
      val = newVal
      dep.notify()
    }
  })
  if (val && typeof val === 'object'){
    Object.keys(val).forEach(k => {
      defineReactive(val, k, val[k])
    })
  }
}

function Dep () {
  /**
   * 保存更新函数数组
   */

  this.watchers = []
}

Dep.prototype.notify = function () {
  /**
   * 通知更新函数更新
   */

  this.watchers.forEach(watcher => {
    watcher.update()
  })
};

Dep.prototype.addCb = function (watcher) {
  /**
   * 添加更新函数
   */

  this.watchers.push(watcher)
}
