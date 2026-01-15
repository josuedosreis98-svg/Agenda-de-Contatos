require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
                .then(()=> {
                    console.log('conectei a base de dados');
                    app.emit('pronto');
                })
                .catch(e => console.log(e));

const routes = require('./route');
const path = require('path');
const {middlewareGlobal, outroMiddleware } = require('./src/middlewares/middleware');

// 1. PRIMEIRO: Configura o tratamento de POST (cria o req.body)
app.use(express.urlencoded({extended:true}));

// 2. Configura arquivos estáticos
app.use(express.static(path.resolve(__dirname,'public')));
app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

// 4. SEGUNDO: Chama seu Middleware Global (antes das rotas!)
app.use(middlewareGlobal);
//app.use(outroMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000,()=>{
    console.log('Acessar http://localhost:3000');
    console.log('Servidor está rodando...');
});
});


