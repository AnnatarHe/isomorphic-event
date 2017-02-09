# isomorphic-event
a isomorphic event package

## usage

```js
import { on, emit, off } from 'isomorphic-event'

on('say', () => {
    console.log('hello world')
})

emit('say')
```
