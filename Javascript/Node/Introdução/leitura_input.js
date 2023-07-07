var scanf = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})

scanf.question('Insira um número: ', (insertion) => {
    console.log(insertion)
    scanf.close()
})