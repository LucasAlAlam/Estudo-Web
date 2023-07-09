const EventEmitter = require('events')
//Chama o módulo events
const evento = new EventEmitter();
//Cria uma classe do EventEmitter
evento.on('start', () => {
    console.log("disparou o evento");
})
//Cria um evento chamado start que, quando for chamado, irá executar uma rotina passada pela arrow function
console.log("Ainda não...")
evento.emit('start') 
//Dispara o evento
console.log("Terminou")