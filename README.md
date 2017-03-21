# isomorphic-event ![](https://travis-ci.org/AnnatarHe/isomorphic-event.svg?branch=master)
An isomorphic event package

## usage

```js
import { on, emit, off } from 'isomorphic-event'

on('say', () => {
    console.log('hello world')
})

emit('say')
```
