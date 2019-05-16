import mqtt from 'mqtt'

var client = mqtt.connect('ws://vmi264440.contaboserver.net/');

export default {
    client: client
}