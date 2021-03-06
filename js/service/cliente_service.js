class ClienteService {
    constructor(){
        this.uri = "https://traback.herokuapp.com/cliente";
    }

    listar_clientes(ok, error) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                if (this.status === 200) {
                    try{
                    ok(JSON.parse(this.responseText));
                    } catch(msg){
                        error(msg);
                    }
                }
                else{
                    error(this.status);
                }
            }
        };
        xhttp.open("GET", this.uri+'/listar', true);
        //console.log(localStorage.getItem("token"));
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    inserirCliente(cliente, ok, error){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status === 201){
                    ok();
                }
                else{
                    error();(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri+'/inserir', true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(cliente));
    }

    deletarCliente(cod_cli, ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("DELETE", this.uri+'/deletar/'+cod_cli, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    buscarClienteId(cod_cli,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uri+'/buscar/'+cod_cli, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    atualizarCliente(cod_cli,cliente,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(this.responseText);
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("PUT", this.uri+'/alterar/'+cod_cli, true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(cliente));
    }
}