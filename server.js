const SerialPort = require('serialport').SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline')

const PORT = process.env.PORT || 3000

const server = require('http').createServer(handler)
const io = require('socket.io')(server) //wrap server app in socket io capability
const fs = require('fs') //file system to server static files
const url = require('url'); //to parse url strings
server.listen(PORT) //start http server listening on PORT


const port = new SerialPort({
    path: 'COM4',
    baudRate: 57600,
})
const parser = port.pipe(new ReadlineParser());

// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
})

// Switches the port into "flowing mode"

io.on('connection', function(socket) {
    console.log('connected');
    parser.on('data', function (data) {
        // console.log('Parser Data:', data)
        io.emit('getData', data)
    })
    socket.on('disconnect', function(data) {
        //event emitted when a client disconnects
        console.log('client disconnected')
    })
});



function handler(req, res) {
    //handler for http server requests including static files
    let urlObj = url.parse(req.url, true, false)
    let filePath = 'public/'+ urlObj.pathname
    // let filePath = 'public/home.html'
    fs.readFile(filePath, function(err, data) {
        if (err) {
          //report error to console
          console.log('ERROR: ' + JSON.stringify(err))
          //respond with not found 404 to client
          res.writeHead(404);
          res.end(JSON.stringify(err))
          return
        }
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.end(data)
      })
  }


