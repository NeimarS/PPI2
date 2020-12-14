
class ClienteController {
    constructor(){
        this.clienteService = new ClienteService();
        this.formClientes = new FormClientes(this,"main");
        this.tabelaClientes = new TabelaClientes(this,"main");
    }

    init(){
        this.carregarClientes();
    }

    carregarFormulario(){
        this.formClientes.montarForm();
    }

    carregarClientes(){
        const self = this;

        let sucesso = function(cliente){
            self.tabelaClientes.montarTabela(cliente);
        }
        
        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            alert("Faça o login antes para acessar essa funcionalidade!");
        }
        

        this.clienteService.listar_clientes(sucesso, erro);
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

    salvarCliente(cliente){
        const self =this;
        let sucesso = function(){
            alert('Cliente inserido com sucesso.');
            self.carregarClientes();
            self.formClientes.limparFormulario();
        }

        let erro =function(msg){
            alert('Cpf ou login já cadastrados!');
            console.error(`Erro: ${msg}`);
        }

        this.clienteService.inserirCliente(cliente, sucesso, erro);
    }
    deletarCliente(id, event) {
        const self = this;
        this.clienteService.deletarCliente(id,
            function() {
                self.carregarClientes();
            },
            function(status){
                console.log(status);
            });
    
    }

    carregarFormularioComCliente(cod_cli, event){
        event.preventDefault();

        const self = this;
        const ok = function(cliente){
            self.formClientes.montarForm(cliente);
        }

        const erro = function(status){
            console.log(status);
        }

        this.clienteService.buscarClienteId(cod_cli,ok,erro);
    }

    editar(id, event){
        event.preventDefault();

        let cliente = this.formClientes.getDataCliente();

        const self = this;
        this.clienteService.atualizarCliente(id, cliente,
            function(){
                self.formClientes.limparFormulario();
                self.carregarClientes();
            },
            function(status){
                console.log(status);
            }
        );
    }
}
