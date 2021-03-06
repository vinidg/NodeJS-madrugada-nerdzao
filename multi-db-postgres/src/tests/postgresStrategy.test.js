const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro', 
    poder: 'Flechas'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        db = await context.connect()
    })
    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Listar', async () => {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        //const [posicao1, posicao2] = {'posicao1','posicao2'}
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})