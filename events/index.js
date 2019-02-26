const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario.click'
meuEmissor.on(nomeEvento, function(click){
    console.log('O usuario clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
// meuEmissor.emit(nomeEvento, 'no botão');

// let count = 0;
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no Ok' + (count++))
// }, 1000);

const stdin = process.openStdin()
stdin.addListener('data', (value) => {
    console.log(`Voce digitou: ${value.toString().trim()}`);
})