class TabelaClientes{
    constructor(controller, seletor){
        this.clienteController = controller;
        this.seletor = seletor;
    }

    montarTabela(cliente){
        //<a id='inserir' href="#">Inserir</a>
        //<h3>Tabela de Clientes</h3>
        var str=`
        <main>
        <h2 align="center">Tabela de clientes</h2>
        <a id='inserir' href="#"><input type="button" value="Inserir" class="btn"></a>
        <div id="tabela">
        <br/>
        
        <table class="tabela" width="100%" align="left" bgcolor="grey">
            <tr>
                <th align="center" ><FONT COLOR="0000FF">id</th>
                <th align="center" ><FONT COLOR="0000FF">nome</th>
                <th align="center" ><FONT COLOR="0000FF">endereço</th>
                <th align="center" ><FONT COLOR="0000FF">telefone</th>
                <th align="center" ><FONT COLOR="0000FF">cpf</th>
                <th align="center" ><FONT COLOR="0000FF">login</th>
                <th align="center" ><FONT COLOR="0000FF">senha</th>
                <th colspan="2"><FONT COLOR="0000FF">Opção</th>
            </tr>`;

        for(var i in cliente){
            str+=`<tr id=${cliente[i].cod_cli}>
                    <td align="center" >${cliente[i].cod_cli}</td>
                    <td align="center" >${cliente[i].nome}</td>
                    <td align="center" >${cliente[i].endereco}</td>
                    <td align="center" >${cliente[i].telefone}</td>
                    <td align="center" >${cliente[i].cpf}</td>
                    <td align="center" >${cliente[i].login}</td>
                    <td align="center" >*****</td>
                    <td><a class="atualizar" href="#"><input type="button" value="Atualizar" class="btn3"></a></td>
                    <td><a class="deletar" href="#"><input type="button" value="Deletar" class="btn3"></a></td>
                </tr>`;    
        } 
        str+= `</table>
                </div>
                </main>`;

        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;
    
        var linkInserir = document.querySelector('#inserir');
        const self = this;
        linkInserir.onclick = function(event){
            self.clienteController.carregarFormulario(event);
        }

        const linksDeletar = document.querySelectorAll(".deletar");
        for(let linkDeletar of linksDeletar){
            const id = linkDeletar.parentNode.parentNode.id;
            linkDeletar.onclick = function(event){
                console.log("id:", id);
                self.clienteController.deletarCliente(id);
            }
        }

        const linksAtualizar = document.querySelectorAll(".atualizar");
        for(let linkAtualizar of linksAtualizar)
        {
            const id = linkAtualizar.parentNode.parentNode.id;
            //Outra forma de tratar o evento (click) - nesse caso deve ter bind
            linkAtualizar.addEventListener("click",this.clienteController.carregarFormularioComCliente.bind(this.clienteController,id));
        }

    }
}