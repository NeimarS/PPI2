class ProdutoController {
    carregarProdutos() {
        const self = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                self.montarTabela(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", "http://localhost:8080/cliente/listar", true);
        xhttp.send();
    }

    montarTabela(produtos){
        let str=`<table>
            <tr>
                <th style='text-align: left;'>Id</th>
                <th style='text-align: left;'>Nome</th>
                <th style='text-align: left;'>Preço</th>
            </tr>`;

        for(var i in produtos){
            str+=`<tr>
                    <td>${produtos[i].id}</td>
                    <td>${produtos[i].nome}</td>
                    <td>${produtos[i].preco}</td>
                </tr>`;
                
        } 
        str+= "</table>";

        let tabela = document.querySelector("#tabela");
        tabela.innerHTML = str;
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtpreco").value="";
    }

    enviarProduto(produto){
        const self = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                //console.log(JSON.parse(this.responseText));
                self.carregarProdutos();
                self.limparFormulario();

            }
        };
        xhttp.open("POST", "http://localhost:8080/cliente/inserir", true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(produto));
        
    }

    salvar(event){
        event.preventDefault();
        let produto = new Produto();
        produto.nome = document.querySelector("#txtnome").value;
        produto.preco = document.querySelector("#txtpreco").value;
        this.enviarProduto(produto);    
    }

}

