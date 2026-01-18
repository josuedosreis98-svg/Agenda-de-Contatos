const Contato = require('../models/ContatoModel');


exports.index = (req, res, next) => {
    return res.render('contato',{contato:{}});
};

exports.register = async (req, res, next) => {

    try{

    const contato = new Contato(req.body);
    await contato.register();

    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(function(){
            return res.redirect('/contato/index');
        });
        return;
    }
    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(()=>{
        return res.redirect(`/contato/index/${contato.contato._id}`);
    });

    }
    catch(e){
        console.log(e);
        return res.render('404');
    }

   
};

exports.editIndex = async (req,res,next) => {

    if(!req.params.id) return res.render('404');
    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato',{contato});
}

exports.edit = async (req,res,next) => {

    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(function(){
            return res.redirect(`/contato/index/${req.params.id}`);
        });
        return;
        }
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(()=>{
            return res.redirect(`/contato/index/${contato.contato._id}`);
        });
    }
    catch(e){
        console.log(e);
        return res.render('404');
    }
}

exports.delete = async (req,res,next) => {
    try{
    if(!req.params.id) return res.render('404');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'Contato removido com sucesso');
    req.session.save(()=>{
            return res.redirect(`/`);
        });
        return;
    }
    catch(e){
        console.log(e);
        return res.render('404');
}

    }
