const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    });
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, ){
        setTimeout(() => {
            return resolve({
                telefone: '77229944',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: "dos bobos",
            numero: 100
        })
    }, 2000);
}

main()
async function main(){
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
        Nome: ${usuario.nome},
        Telefone: (${telefone.ddd}) ${telefone.telefone},
        Endereco: ${endereco.rua}, ${endereco.numero}`)

    } catch (error) {
        console.log('Deu Ruim', error);
    }
    console.timeEnd('medida-promise')
}

// const usuarioPromise = obterUsuario()

// usuarioPromise
    // .then( (usuario) => {
        // return obterTelefone(usuario.id)
            // .then(function resolverTelefone(resultado) {
                // return {
                    // usuario:{
                        // nome: usuario.nome,
                        // id: usuario.id
                    // },
                    // telefone: resultado
                // }
            // })
    // })
    // .then((resultado) =>{
        // const endereco = obterEnderecoAsync(resultado.usuario.id)
        // return endereco.then(function resolverEnderedo(result){
            // return {
                // usuario: resultado.usuario,
                // telefone: resultado.telefone,
                // endereco: result
            // }
        // })
    // })
    // .then( (resultado) => {
        // console.log(`${JSON.stringify(resultado, null, 2)}`)
    // })
    // .catch( (error) => {
        // console.error('Error:', error)
    // })