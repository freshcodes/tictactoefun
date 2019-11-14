const eventing = {
  on (name, fn) {
    if (!this._events) this._events = {}
    if (!this._events[name]) this._events[name] = []
    this._events[name].push(fn)
  },

  off (name, fn) {
    const handlers = this._events && this._events[name]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === fn) handlers.splice(i--, 1)
    }
  },

  trigger (name, ...args) {
    if (!this._events || !this._events[name]) return
    this._events[name].forEach(fn => fn.apply(this, args))
  }
}

export default eventing
