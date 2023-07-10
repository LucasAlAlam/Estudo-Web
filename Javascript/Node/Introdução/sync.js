const fs = require ('fs')

fs.writeFileSync('arquivo.txt', 'Arquivo escrito com método síncrono')
console.log(fs.readFileSync('arquivo.txt', 'utf-8')) 

/* Nas funções síncronas, não existe uma arrow function passada dentro dos argumentos. Essa arrow function representa um callback da função e, com funções síncronas, isso não existe.
Na função a seguir, a arrow function não tem efeito algum:
    console.log(fs.readFileSync('arquivo.txt', 'utf-8', () => {console.log('isso não funciona')})) 
Em fs.readFileSync('arquivo.txt', 'utf-8'), o que está escrito em arquivo.txt é obtido como retorno
*/