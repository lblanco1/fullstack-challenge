const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Lista");
const List = mongoose.model('user');

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //Permite que apenas essa porta tenha acesso a API
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE'); // aqui permitimos quais tipos de verbos http queremos liberar acesso
    app.use(cors());
    next();
});

// Conecta ao banco de dados
mongoose.connect('mongodb://localhost/lista', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((err) => {
    console.log("Erro: Houve um erro ao se conectar ao MongoDB: " + err);
});

// busca todas as informações/cadastros do banco
app.get('/', (req, res) => {

    List.find({}).then((user) => {
        return res.json(user);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuario encontrado!"
        });
    });
});

// busca uma informação especifica do banco
app.get('/user/:id', (req, res) => {

    List.findOne({_id: req.params.id }).then((user) => {
        return res.json(user);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuario encontrado!"
        });
    });
});

//cadastra novos usuarios/clientes
app.post('/user', (req, res) => {
    const user = List.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Usuario Não foi cadastrado!"
        });

        return res.status(200).json({
            error: false,
            message: "Usuario caadastrado com sucesso!"
        });
    });


    // var db = require('../db');
    // var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customer');
    // var newcustomer = new Customer({ name: req.body.name, lastName: req.body.email, participation: req.body.participation });
    // newcustomer.save(function (err) {
    //     if(err) {
    //         res.status(500).json({ error: err.message });
    //         res.end();
    //         return;
    //     }
    //     res.json(newcustomer);
    //     res.end();
    // })
    
});

// edita um cadastro
app.put('/user/:id', (req, res) => {

    const user = List.updateOne({_id: req.params.id}, req.body, (erro) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Usuario nao encontrado!" 
        });

        return res.json({
            error: false,
            message: "Usuario editado com sucesso"
        });
    });
});


//apaga dados do banco, buscando por id
app.delete('/user/:id', (req, res) => {

    const user = List.deleteOne({_id: req.params.id}, req.body, (erro) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Usuario nao foi apagado!" 
        });

        return res.json({
            error: false,
            message: "Usuario apagado com sucesso!"
        });
    });
});

// conectando com a porta http://localhost:8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta http://localhost:8080");
});