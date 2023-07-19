const path = require ('path')
//Módulo para manusear caminhos de arquivos

/*
----------------------Recebendo informações dos caminhos-------------------------------------
const customPath = '/Inicio/seguindo/continue/quasela/chegando/arquivo.pdf'

console.log(path.basename(customPath), path.extname(customPath), path.dirname(customPath))
*/

/*
----------------------Recebendo o caminho absoluto do arquivo---------------------------------
console.log(path.resolve('arquivo.txt'))
*/

/*
----------------------Montando caminhos a partir de Strings------------------------------------
const midFolder = 'relatorios'
const fileName = 'relatorio.pdf'

const finalPath = path.join('/', midFolder, fileName)
console.log(finalPath)
*/
