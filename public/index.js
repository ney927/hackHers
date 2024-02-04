const socket = io()

const finger = document.getElementById('finger')
const ir = document.getElementById('ir')
const bpm = document.getElementById('bpm')
const avg_bpm = document.getElementById('avg_bpm')
const oxygen = document.getElementById('oxygen')


socket.on('getData', function(data){
    let stats = data.slice(0, -2).split(',')
    if(stats[0] == '0'){
        finger.innerHTML = "Error: finger undetected"
    }else {
        finger.innerHTML = "All Systems Operational"
    }
    ir.innerHTML = stats[1]
    bpm.innerHTML = stats[2]
    avg_bpm.innerHTML = stats[3]
    oxygen.innerHTML = stats[4] + "%"
})