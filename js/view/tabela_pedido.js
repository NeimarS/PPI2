class TabelaPedido{
    constructor(controller, seletor){
        this.pedidoController = controller;
        this.seletor = seletor;
    }

    montarTabela(pedido){
        //<a id='inserir' href="#">Inserir</a>
        //<h3>Tabela de Clientes</h3>
        var str=`
        <main>
        <h2 align="center">Tabela de Pedidos</h2>
        <a id='inserir' href="#"><input type="button" value="Inserir" class="btn"></a>
        <div id="tabela">
        <br/>
        
        <table class="tabela" width="100%" align="left" bgcolor="grey">
            <tr>
                <th align="center" ><FONT COLOR="0000FF">id</th>
                <th align="center" ><FONT COLOR="0000FF">cod_cli</th>
                <th align="center" ><FONT COLOR="0000FF">cliente</th>
                <th align="center" ><FONT COLOR="0000FF">dvd1</th>
                <th align="center" ><FONT COLOR="0000FF">dvd2</th>
                <th align="center" ><FONT COLOR="0000FF">dvd3</th>
                <th align="center" ><FONT COLOR="0000FF">dvd4</th>
                <th align="center" ><FONT COLOR="0000FF">dvd5</th>
                <th align="center" ><FONT COLOR="0000FF">vencimento</th>
                <th align="center" ><FONT COLOR="0000FF">valortotal</th>
                <th align="center" ><FONT COLOR="0000FF">situacao</th>
                <th colspan="2"><FONT COLOR="0000FF">Opção</th>
            </tr>`;

        for(var i in pedido){
            str+=`<tr id=${pedido[i].cod_pedido}>
                    <td align="center" >${pedido[i].cod_pedido}</td>
                    <td align="center" >${pedido[i].cod_cli}</td>
                    <td align="center" >${pedido[i].nome}</td>
                    <td align="center" >${pedido[i].dvd1}</td>
                    <td align="center" >${pedido[i].dvd2}</td>
                    <td align="center" >${pedido[i].dvd3}</td>
                    <td align="center" >${pedido[i].dvd4}</td>
                    <td align="center" >${pedido[i].dvd5}</td>
                    <td align="center" >${pedido[i].vencimento}</td>
                    <td align="center" >${pedido[i].valortotal}</td>
                    <td align="center" >${pedido[i].situacao}</td>
                    <td><a class="atualizar" href="#"><input type="button" value="Atualizar" class="btn3"></a></td>
                    <td><a class="deletar" href="#"><input type="button" value="Devolver" class="btn3"></a></td>
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
            self.pedidoController.carregarFormulario(event);
        }

        const linksDeletar = document.querySelectorAll(".deletar");
        for(let linkDeletar of linksDeletar){
            const id = linkDeletar.parentNode.parentNode.id;
            linkDeletar.onclick = function(event){
                console.log("id:", id);
                //self.pedidoController.devolverPedido(id);
                self.pedidoController.devolverPedido(id);
            }
        }

        const linksAtualizar = document.querySelectorAll(".atualizar");
        for(let linkAtualizar of linksAtualizar)
        {
            const id = linkAtualizar.parentNode.parentNode.id;
            //Outra forma de tratar o evento (click) - nesse caso deve ter bind
            linkAtualizar.addEventListener("click",this.pedidoController.carregarFormularioComPedido.bind(this.pedidoController,id));
        }

    }
}