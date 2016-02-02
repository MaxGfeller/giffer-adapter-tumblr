# giffer-adapter-tumblr

This is a simple [giffer](https://www.github.com/MaxGfeller/giffer) adapter for tumblr.

## Usage

All you need to start off with is a API consumer key and a tumblr blog with funny GIFs on it.

```javascript
var AdapterTumblr = require('giffer-adapter-tumblr')

var adapter = new AdapterTumblr({
  consumerKey: '<your-consumer-key>',
  tumblr: 'really-funny-gifs.tumblr.com'
})

adapter.start()

adapter.on('gif', ())
```
