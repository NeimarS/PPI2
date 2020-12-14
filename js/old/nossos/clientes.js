//-------- Funções de Clientes --------

// Listar Clientes 
function listar_clientes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            montarTabela(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "http://localhost:8080/cliente/listar", true);
    xhttp.send();
}

function montarTabela(dados){
    var str=`<table>
        <tr>
            <th align="center" width="20%">id</th>
            <th align="center" width="20%">nome</th>
            <th align="center" width="20%">endereço</th>
            <th align="center" width="20%">telefone</th>
            <th align="center" width="20%">cpf</th>
        </tr>`;

    for(var i in dados){
        str+=`<tr>
                <td align="center" width="20%">${dados[i].cod_cli}</td>
            	<td align="center" width="20%">${dados[i].nome}</td>
            	<td align="center" width="20%">${dados[i].endereco}</td>
            	<td align="center" width="20%">${dados[i].telefone}</td>
            	<td align="center" width="20%">${dados[i].cpf}</td>
            </tr>`;    
    } 
    str+= "</table>";

    var tabela = document.querySelector("#clients-container");
    tabela.innerHTML = str;
}