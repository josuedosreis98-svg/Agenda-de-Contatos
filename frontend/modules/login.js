import validator from 'validator';

export default class Login { 
    constructor(formClass) {
    
        this.form = document.querySelector(formClass);

    }

    init() {
        this.events()
    }

    events() {
    
    if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
            
        });
    }

    validate(e){ 
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;
        this.cleanUp();

        if (!validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput, 'E-mail inválido');
            error = true;
         }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.criaErro(passwordInput, 'Senha precisa ter entre 3 e 50 caracteres');
            error = true;
        }

        if(!error) el.submit();
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        div.classList.add('text-danger'); 
        div.style.marginTop = '5px';
        div.style.fontSize = '12px';
        
        campo.insertAdjacentElement('afterend', div);
    }

    cleanUp() {
        const errors = this.form.querySelectorAll('.error-text');
        for (const error of errors) {
            error.remove();
        }
}

}