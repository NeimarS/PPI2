class TabelaProdutos {
    constructor(controller, seletor){
        this.produtoController = controller;
        this.seletor = seletor;
    }

    montarTabela(produtos){
        var str=`
        <h3>Tabela de Produtos</h3>
        <a id='novo' href="#">Novo</a>
        <div id="tabela">

        <table>
            <tr>
                <th style='text-align: left;'>Id</th>
                <th style='text-align: left;'>Nome</th>
                <th style='text-align: left;'>Preço</th>
                <th colspan="2">Ação</th>
            </tr>`;
    
        for(var i in produtos){
            str+=`<tr id=${produtos[i].id}>
                    <td>${produtos[i].id}</td>
                    <td>${produtos[i].nome}</td>
                    <td>${produtos[i].preco}</td>
                    <td><a class="edit" href="#">Editar</a></td>
                    <td><a class="delete" href="#">Deletar</a></td>    
                </tr>`;
                
        } 
        str+= `
        </table>
        </div>`;

    
        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;

        var linkNovo = document.querySelector("#novo");
        const self = this;
        linkNovo.onclick = function(event){
            self.produtoController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for(let linkDelete of linksDelete)
        {
            const id = linkDelete.parentNode.parentNode.id;
            linkDelete.onclick = function(event){
                console.log("id:",id);
                self.produtoController.deletarProduto(id);
            }
        }

        const linksEdit = document.querySelectorAll(".edit");
        for(let linkEdit of linksEdit)
        {
            const id = linkEdit.parentNode.parentNode.id;
            //Outra forma de tratar o evento (click) - nesse caso deve ter bind
            linkEdit.addEventListener("click",this.produtoController.carregaFormularioComProduto.bind(this.produtoController,id));
        }

    }

}