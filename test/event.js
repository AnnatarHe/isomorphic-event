import test from 'ava'
import { on, emit, off } from '../src/index'

test('test on func should can be saved', t => {
    t.notThrows(() => {
        on('hello', () => {})
    })
})

test('test emit func should be run', t => {
    let num = 0
    on('hello', () => {
        num = 1
    })
    emit('hello')
    t.is(num, 1)
})

test('test off func can be remove after use off', t => {
    let num = 0
    function run() {
        num += 1
    }
    on('hello', run)
    off('hello', run)
    emit('hello')
    t.is(num, 0)
})

test('test emit function before listener has be settled', t => {
    let love = false
    emit('love')
    on('love', () => { love = true})
    t.true(love)
})
