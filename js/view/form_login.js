class FormLogin {

    constructor(controller, seletor){
        this.loginController = controller;
        this.seletor = seletor;
    }

    montarForm(login){
        /*
        if(!login){
            login = new Login();
        }
        */
       
        if (localStorage.getItem("token")) {
            str =  `
            <form id="formulario">
            <input type="submit" id="btacessar" value="Deslogar" class="btn"></form>`;
        }
        else {
            var str =  `
            <form id="formulario">
            <label for="login" class="texto">Login:</label>
            <input type="text" id="login" class="campos" autofocus="true"><br/>
            <label for="senha" class="texto">Senha:</label>
            <input type="password" id="senha" class="campos"><br/><br/>
            <input type="submit" id="btacessar" value="Acessar" class="btn"></form>`;
        }
        

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){   
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token");
                loginController.init();
            }
            else {
                let login = new Login()
                login.login = document.querySelector("#login").value;
                login.senha = document.querySelector("#senha").value;      
                self.loginController.fazerLogin(event, login);
            }
        }
        
    }

    limparFormulario(){
        document.querySelector("#login").value="";
        document.querySelector("#senha").value="";
    }

    

}