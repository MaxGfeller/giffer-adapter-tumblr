var tumblr = require('tumblr.js')
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter

inherits(Adapter, EventEmitter)

function Adapter (config) {
  if (!config.consumerKey) throw new Error('API consumer key is needed')
  if (!config.tumblr) throw new Error('A specific tumblr is required')

  this.client = tumblr.createClient({
    consumer_key: config.consumerKey
  })

  this.pages = config.pages || 3
  this.pageSize = 40
  this.tumblr = config.tumblr
  this.minNoteCount = config.minNoteCount || 0
  this.currentPage = 0

  this.stopped = true
}

Adapter.prototype.start = function () {
  this.stopped = false
  this.emit('start')

  fetchPage.call(this)
}

Adapter.prototype.stop = function () {
  this.stopped = true
  this.emit('stop')
}

function fetchPage () {
  if (this.currentPage === this.pages - 1) {
    this.stop()
    return
  }

  var self = this
  var offset = this.pageSize * (this.currentPage)
  self.client.posts(this.tumblr, {
    type: 'photo',
    limit: this.pageSize,
    offset: offset
  }, function (err, data) {
    if (err) throw err

    data.posts.map(function (post) {
      if (post.note_count < self.minNoteCount) return

      post.photos.map(function (photo) {
        self.emit('gif', photo.original_size.url, { origin: post.post_url })
      })
    })

    self.currentPage++
    fetchPage.call(self)
  })
}
