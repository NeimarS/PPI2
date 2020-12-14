class PedidoService {
    constructor(){
        this.uri = "https://traback.herokuapp.com/pedido";
    }
    
    inserirPedido(pedido, ok, error){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status === 201){
                    ok();
                }
                else if(this.status == 200){
                    error(JSON.parse(this.responseText));
                }
                else{
                    error();(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri+'/inserir', true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(pedido));
    }

    devolverPedido(cod_pedido, ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("DELETE", this.uri+'/devolver/'+cod_pedido, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    listar_pedidos(ok, error) {
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
        xhttp.open("GET", this.uri+'/listartodos', true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }


    
    buscarPedidoId(cod_pedido,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uri+'/buscar/'+cod_pedido, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }
    

    atualizarPedido(cod_pedido,pedido,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(this.responseText);
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("PUT", this.uri+'/alterar/'+cod_pedido, true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(pedido));
    };
}