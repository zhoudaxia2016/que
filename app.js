let express = require('express')
let path = require('path')
let host = 'localhost'
let port = 3000
let app = express()
let chokidar = require('chokidar')

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.use('/static', express.static('src'))

let server = app.listen(port, function () {
  console.log('Example app listening at http://%s:%s', host, port)
})
let io = require('socket.io')(server)
let watcher = chokidar.watch('./src')
watcher.on('all', function (event, path) {
  io.emit('message', { change: true })
  console.log('File: ', path)
  console.log('Event: ', event)
})
