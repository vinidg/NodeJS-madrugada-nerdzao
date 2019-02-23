const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const joi = require('joi');

const casaSchema = require('./schemas/casas');

// const stringDeConexao = "mongodb://galera:nerdzao123@ds021984.mlab.com:21984/got-nerdzao";
const stringDeConexao = "mongodb://localhost:27017/got-nerdzao";

async function main(){
    const garcom = express();

    garcom.use(bodyParser.json());
    
    const cliente = new mongodb(stringDeConexao, {
        useNewUrlParser: true
    });

    await cliente.connect();
    const db = cliente.db("got-nerdzao");

    const colecaoCasas = db.collection("casas");

    garcom.get("/casas", async (req, res) => {
        const casas = await colecaoCasas.find({}).toArray();
        res.send(casas);
    });
    
    garcom.post("/casas", async (req, res) => {
       const novaCasa = req.body;

       const resultadoDaValidacao = joi.validate(novaCasa, casaSchema);

       if(resultadoDaValidacao.error != null){
            res.status(400);
            res.send({
                error: resultadoDaValidacao.error.details[0].message
            });
            return;
       }
       // Json stringfy para retornar 2 espaçamentos 
       console.log(`novaCasa: ${JSON.stringify(novaCasa,null, 2)}`);
       
       const result = await colecaoCasas.insertOne(novaCasa);
       res.status(201).send(result.ops[0]); 
    });

    garcom.listen(3000, () => console.log("Servidor rodando..."));
}
main();