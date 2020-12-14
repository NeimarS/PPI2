const clienteController = new ClienteController();

let listar_cliente = document.querySelector("#listar_cliente");
listar_cliente.onclick = function(){
    clienteController.init();
}