const pedidoController = new PedidoController();

let listar_pedido = document.querySelector("#listar_pedidos");
listar_pedido.onclick = function(){
    pedidoController.init();
}