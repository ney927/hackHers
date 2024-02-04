const socket = io()

const finger = document.getElementById('finger')
const bpmMssg = document.getElementById('bpm-mssg')
const oxyMssg = document.getElementById('oxy-mssg')
const ir = document.getElementById('ir')
const bpm = document.getElementById('bpm')
const avg_bpm = document.getElementById('avg_bpm')
const oxygen = document.getElementById('oxygen')


socket.on('getData', function(data){
    let stats = data.slice(0, -2).split(',')
    finger.innerHTML = "Status:"
    if(stats[0] == '0'){
        finger.innerHTML = "Error: finger undetected"
    }else {
        finger.innerHTML = "All Systems Operational"
    }
    bpmMssg.innerHTML = "BPM: "
    if(stats[2] < 60 ){
        bpmMssg.innerHTML += "Heart beat is too low. Seek medical help.";
    }
    else if(stats[2] < 100){
        bpmMssg.innerHTML += "Looking good!"
    }
    else if(stats[2] > 100 && stats[2] < 160){
        bpmMssg.innerHTML += "Heart beat is high. Sit down and take 3 deep breaths."
    }
    else{
        bpmMssg.innerHTML += "Heart beat is too high. Lay down and seek medical help."
    }
    oxyMssg.innerHTML = "Oxygen: "
    if(stats[4] < 95){
        oxyMssg.innerHTML += "Oxygen level is too low. Put on oxygen mask."
    } else {
        oxyMssg.innerHTML += "Looking good!"
    }
    ir.innerHTML = stats[1]
    bpm.innerHTML = stats[2]
    avg_bpm.innerHTML = stats[3]
    oxygen.innerHTML = stats[4] + "%"
})