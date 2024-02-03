var path = require('path');
var express = require('express');

const SerialPort = require('serialport').SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline')

const PORT = process.env.PORT || 3000
var app = express(); //create express middleware dispatcher
var queryTables = 'A';

//middleware
app.use(express.static(__dirname + '/public')) //provide static server

app.get("/",  function (req, res){
    res.sendFile(path.join(process.cwd() + '/public/home.html'));
})

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
parser.on('data', function (data) {
    // console.log('Parser Data:', data)
})


//handle non-existing requests
app.use((req,res)=>{
    res.status(404).send('404: Page Not Found')
})

//start server
app.listen(PORT, err => {
    if(err) console.log(err)
    else {console.log(`Server listening on port: ${PORT}`)}
})


