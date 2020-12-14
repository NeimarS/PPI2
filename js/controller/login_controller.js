class LoginController {
    constructor(){
        this.loginService = new LoginService();
        this.formLogin = new FormLogin(this,"main");
    }

    init(){
        this.carregarFormulario();
    }

    carregarFormulario(){
        this.formLogin.montarForm();
    }

    fazerLogin(event, login){
        event.preventDefault();
        const self = this;

        let sucesso = function(ok){
            localStorage.setItem("token", ok.slice(10,-2));
            self.formLogin.limparFormulario();
            loginController.init();
        }
        
        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            self.formLogin.limparFormulario();
            alert("Usuário ou senha inválidos!");
        }
        

        this.loginService.logar(sucesso, erro, login);

    }

    salvar(event){
        event.preventDefault();
        let cliente = this.formClientes.getDataCliente();
        this.salvarCliente(cliente);
    }

    limpar(event){
        event.preventDefault();
        this.formClientes.limparFormulario();
        this.carregarClientes();
    }

    
}
