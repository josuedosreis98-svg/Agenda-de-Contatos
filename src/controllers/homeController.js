const HomeModel = require('../models/homeModel');

// HomeModel.create({
//     titulo: 'Um título de Testes',
//     descricao: 'Uma descrição de testes'
// }).then(dados => console.log(dados))
//    .catch(e => console.log(e));

exports.paginaInicial = (req,res,next) => {

    

    res.render('index',{
        titulo: 'Página inicial',
        numeros: [0,1,2,3,4,5,6,7,8,9]
    });
    return
} 

exports.trataPost = (req,res,next) => {
    res.send(req.body);
    return
}