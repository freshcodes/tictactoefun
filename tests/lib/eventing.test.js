import eventing from '../../src/lib/eventing.js'

describe('eventing', () => {
  test('on, trigger, off', () => {
    expect.assertions(3)

    let obj = Object.create(eventing)

    let handler = function (arg1, arg2) {
      expect(arg1).toBe(true)
      expect(arg2).toBe(false)
      expect(this).toBe(obj)
    }

    obj.on('test', handler)
    obj.trigger('test', true, false)
    obj.off('test', handler)
    obj.trigger('test')
  })
})
