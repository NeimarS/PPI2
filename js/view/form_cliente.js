class FormClientes {

    constructor(controller, seletor){
        this.clienteController = controller;
        this.seletor = seletor;
    }

    montarForm(cliente){
        //<h2>Formulario de Clientes</h2>
        if(!cliente){
            cliente = new Cliente();
        }
        var str = `
        
        <form id="formulario">
            <input type="hidden" id="cod_cliCliente" value="${cliente.cod_cli}" />
            <label for="txtnome" class="texto2">Nome:</label>
            <input type="text" id="txtnome" class="campos2" value="${cliente.nome ?cliente.nome :''}">
            <br />
            <label for="txtendereco" class="texto2">Endereço:</label>
            <input type="text" id="txtendereco" class="campos2" value="${cliente.endereco ?cliente.endereco :''}">
            <br />
            <label for="txttelefone" class="texto2">Telefone:</label>
            <input type="text" id="txttelefone" class="campos2" value="${cliente.telefone ?cliente.telefone :''}">
            <br />
            <label for="txtcpf" class="texto2">Cpf:</label>
            <input type="text" id="txtcpf" class="campos2" value="${cliente.cpf ?cliente.cpf :''}">
            <br />
            <label for="txtlogin" class="texto2">Login:</label>
            <input type="text" id="txtlogin" class="campos2" value="${cliente.login ?cliente.login :''}">
            <br />
            <label for="txtsenha" class="texto2">Senha:</label>
            <input type="password" id="txtsenha" class="campos2" value="${cliente.senha ?cliente.senha :''}">
            <br />
            <br />
            <input type="submit" id="btnsalvar" class="btn2" value="Salvar">
            <input type="reset" class="btn2" value="Cancelar">
            <br />
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){            
            if(!cliente.cod_cli){
                self.clienteController.salvar(event);
            }
            else{
                self.clienteController.editar(cliente.cod_cli,event);
            }
        }

        form.onreset = function(event){
            event.preventDefault();
            //self.clienteController.limpar();
            self.clienteController.carregarClientes();
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtendereco").value="";
        document.querySelector("#txttelefone").value="";
        document.querySelector("#txtcpf").value="";
        document.querySelector("#txtlogin").value="";
        document.querySelector("#txtsenha").value="";
        
    }

    getDataCliente(){
        let cliente = new Cliente();
        if(!document.querySelector("#cod_cliCliente").value)
            cliente.cod_cli = document.querySelector("#cod_cliCliente").value;
            cliente.nome = document.querySelector("#txtnome").value;
            cliente.endereco = document.querySelector("#txtendereco").value;
            cliente.telefone = document.querySelector("#txttelefone").value;
            cliente.cpf = document.querySelector("#txtcpf").value;
            cliente.login = document.querySelector("#txtlogin").value;
            cliente.senha = document.querySelector("#txtsenha").value;
            

        return cliente;
    }

}