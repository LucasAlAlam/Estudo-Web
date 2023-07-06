const s = require('./moduloInterno.js') //para módulos internos, é necessário passar o caminho relativo com ./ especificando o diretório atual. Podemos suprimir o .js
const soma = s.soma() //pega o método soma() da constante s e encapsula ele em outra constante soma. Evita ter que usar s.soma() no código todo
soma (45,2)